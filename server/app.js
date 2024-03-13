require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet"); // Middleware de seguridad HTTP
const rateLimit = require("express-rate-limit"); // Middleware de limitación de velocidad
const csurf = require("csurf"); // Middleware de protección CSRF
const cookieParser = require("cookie-parser");
const connection = require("./src/config/db");
const verifyToken = require("./src/middleware/verifyToken");
const createTestUsers = require("./src/utils/createTestUsers");

const app = express();

// Middleware de seguridad HTTP
app.use(helmet());

// Middleware de limitación de velocidad
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de solicitudes por IP
});
app.use(limiter);

// Middleware de protección CSRF
app.use(csurf());
app.use((err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // Manejar el error de token CSRF inválido
  res.status(403).send("¡Token CSRF inválido!");
});

app.use(cors());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importa los modelos
const User = require("./src/models/User");
const Playlist = require("./src/models/Playlist");

// Route for root endpoint of the API
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/welcome.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});

app.get("/home", verifyToken ,(req, res) => {
  res.sendFile(__dirname + "/public/home.html");
})

app.get("/reset-password", verifyToken ,(req, res) => {
  res.sendFile(__dirname + "/public/reset-password.html");
})

// Conecta a la base de datos y sincroniza los modelos
connection
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos");
    return connection.sync({ force: true });
  })
  .then(() => {
    console.log("Los modelos han sido sincronizados");

    // Inicializa las asociaciones
    User.associate({ Playlist });
    Playlist.associate({ User });

    // Crea los usuarios de prueba
    return createTestUsers();
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

// Routes for authentication and user management
app.use("/api/users", verifyToken ,require("./src/routes/users.route"));
app.use("/api/playlists", verifyToken ,require("./src/routes/playlist.route"));
app.use("/auth", require("./src/routes/auth.route"));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}.`);
});
