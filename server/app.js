require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const createTestUsers = require("./src/utils/createTestUsers");
const verifyToken = require("./src/middleware/verifyToken");
const port = process.env.PORT || 3000;

const app = express();

// Middleware de seguridad
app.use(helmet());

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

// Crea algunos usuarios de prueba
createTestUsers();

// Usar las rutas en la aplicación
app.use("/api/v1/users", verifyToken ,require("./src/routes/users.route.js"));
app.use("/api/v1/playlists", verifyToken ,require("./src/routes/playlist.route.js"));
app.use("/auth", require("./src/routes/auth.route.js"));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
