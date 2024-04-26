import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit"; // Middleware de limitación de velocidad
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import "./src/config/db.js";
import cors from "cors";
import Playlist from "./src/models/Playlist.js";
import User from "./src/models/User.js";
import createTestUsers from "./src/utils/createTestUsers.js";
import verifyToken from "./src/middleware/verifyToken.js";

const app = express();

// Middleware de limitación de velocidad
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de solicitudes por IP
});
app.use(limiter);

// Configura CORS para permitir solicitudes desde http://localhost:5173
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Habilita el intercambio de cookies entre dominios
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

(async () => {
  try {
    await import("./src/config/db.js").then((mod) => mod.default());
    await import("./src/models/User.js").then((mod) => mod.default());
    await import("./src/models/Playlist.js").then((mod) => mod.default());
    await import("./src/utils/createTestUsers.js").then((mod) => mod.default());

    // Inicializa las asociaciones
    User.associate({ Playlist });
    Playlist.associate({ User });

    // Crea los usuarios de prueba
    await createTestUsers();

    // Routes for authentication and user management
    app.use("/api/v1/users", verifyToken, await import("./src/routes/users.route.js"));
    app.use("/api/v1/playlists", verifyToken, await import("./src/routes/playlist.route.js"));
    app.use("/auth", await import("./src/routes/auth.route.js"));

    app.listen(process.env.APP_PORT, () => {
      console.log(`Server is running on port ${process.env.APP_PORT}.`);
    });
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
})();

