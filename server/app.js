require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./src/config/db");
const verifyToken = require("./src/middleware/verifyToken");
const createTestUsers = require("./src/utils/createTestUsers");
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(cookieParser());
app.set('view engine', 'ejs');
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

app.get("/reset-password", (req, res) => {
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
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

// Routes for authentication and user management
app.use("/api/users", require("./src/routes/users.route"));
app.use("/api/playlists", require("./src/routes/playlist.route"));
app.use("/auth", require("./src/routes/auth.route"));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}.`);
});

// Connect to the database and create test users and playlists
createTestUsers();
