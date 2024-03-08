require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mysql = require("mysql"); // Importa el paquete mysql2
const createTestUsers = require('./data/createTestUsers'); // Asegúrate de que la ruta sea correcta

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Alphonics API.");
});

// Routes 

app.use("/api/users", require("./src/routes/users.route"));
app.use("/auth", require("./src/routes/auth.route"));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}.`);
});

createTestUsers(); // Llama a la función para crear usuarios de prueba