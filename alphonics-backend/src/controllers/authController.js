const User = require("../models/User");

class AuthController {
  // Método para registrar un nuevo usuario
  async register(req, res) {
    try {
      // Lógica para registrar al usuario
      const userData = req.body;

      // Manejo de errores si los datos son inválidos
      if (!userData) {
        res.status(400).json({ error: "Lease provide user data" });
      } else if (!userData.username || !userData.email || !userData.password) {
        res.status(400).json({ error: "User data is incomplete" });
      } else if (
        userData.username.length < 3 ||
        userData.username.length > 30
      ) {
        res
          .status(400)
          .json({ error: "Username must be between 3 and 30 characters" });
      } else if (
        !userData.email.includes("@") ||
        !userData.email.includes(".")
      ) {
        res.status(400).json({ error: "Invalid email address" });
      } else if (userData.password.length < 8) {
        res
          .status(400)
          .json({ error: "Password must be at least 8 characters long" });
      } else {
        // Lógica para crear el usuario en la base de datos
        User.create(userData)
          .then((user) => {
            res.json({
              success: true,
              message: "User created successfully",
              user: user,
            });
          })
          .catch((error) => {
            console.log(error);

            res.status(500).json({ error: "Failed to register user" });
          });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to register user" });
    }
  }

  // Método para iniciar sesión
  async login(req, res) {
    try {
      // Lógica para autenticar al usuario
      const userData = req.body;

      // Manejo de errores si los datos son inválidos
      if (!userData) {
        res.status(400).json({ error: "User data is required" });
      } else if (!userData.username || !userData.password) {
        res.status(400).json({ error: "User data is incomplete" });
      } else if (
        userData.username.length < 3 ||
        userData.username.length > 30
      ) {
        res
          .status(400)
          .json({ error: "Username must be between 3 and 30 characters" });
      } else if (userData.password.length < 8) {
        res
          .status(400)
          .json({ error: "Password must be at least 8 characters long" });
      } else {
        // Lógica para autenticar al usuario en la base de datos
        const user = await User.findOne({
          where: {
            username: userData.username,
          },
        });

        if (!user) {
          res.status(401).json({ error: "Invalid credentials" });
        } else if (user.password !== userData.password) {
          res.status(401).json({ error: "Invalid credentials" });
        } else {
          // Lógica para iniciar sesión del usuario

          // Enviar respuesta de autenticación
          res.json({
            success: true,
            message: "Login successful",
            user: user,
          });
        }
      }
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: "Unable to login" });
    }
  }

  // Método para cerrar sesión
  async logout(req, res) {
    try {
      // Lógica para cerrar sesión del usuario
      // ...

      // Enviar respuesta de éxito
      res.status(200).json({ message: "Cierre de sesión exitoso" });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ error: "Error al cerrar sesión" });
    }
  }
}

module.exports = AuthController;
