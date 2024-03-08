require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createTestUsers = require('./data/createTestUsers'); // Asegúrate de que la ruta sea correcta

const app = express();
app.use(cors());

// Route for root endpoint of the API
app.get("/", (req, res) => {
  res.send("Welcome to Alphonics API.");
});

// Routes for authentication and user management
app.use("/api/users", require("./src/routes/users.route"));
app.use("/auth", require("./src/routes/auth.route"));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}.`);
});

createTestUsers(); // Llama a la función para crear usuarios de prueba