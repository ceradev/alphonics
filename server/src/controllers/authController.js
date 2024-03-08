const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require("../models/User");

// Accede a la clave secreta desde el archivo .env
const secretKey = process.env.JWT_SECRET;

class AuthController {
  // Método para registrar un nuevo usuario
  async register(req, res) {
    try {
      // Lógica para registrar al usuario
      const userData = req.body;

      // Manejo de errores si los datos son inválidos
      if (!userData) {
        return res.status(400).json({ error: "Please provide user data" });
      } else if (!userData.username || !userData.email || !userData.password) {
        return res.status(400).json({ error: "User data is incomplete" });
      } else if (
        userData.username.length < 3 ||
        userData.username.length > 30
      ) {
        return res
          .status(400)
          .json({ error: "Username must be between 3 and 30 characters" });
      } else if (
        !userData.email.includes("@") ||
        !userData.email.includes(".")
      ) {
        return res.status(400).json({ error: "Invalid email address" });
      } else if (userData.password.length < 8) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters long" });
      } else {
        // Lógica para crear el usuario en la base de datos
        const user = await User.create(userData);

        // Generar token JWT
        const token = jwt.sign({ user: user.id }, secretKey , { expiresIn: '1h' });

        // Establecer token en una cookie
        res.cookie('token', token, { httpOnly: true });

        return res.json({
          success: true,
          message: "User created successfully",
          user: user,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Unable to register user" });
    }
  }

  // Método para iniciar sesión
  async login(req, res) {
    try {
      // Lógica para autenticar al usuario
      const userData = req.body;

      // Manejo de errores si los datos son inválidos
      if (!userData) {
        return res.status(400).json({ error: "User data is required" });
      } else if (!userData.username || !userData.password) {
        return res.status(400).json({ error: "User data is incomplete" });
      } else if (
        userData.username.length < 3 ||
        userData.username.length > 30
      ) {
        return res
          .status(400)
          .json({ error: "Username must be between 3 and 30 characters" });
      } else if (userData.password.length < 8) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters long" });
      } else {
        // Lógica para autenticar al usuario en la base de datos
        const user = await User.findOne({
          where: {
            username: userData.username,
          },
        });

        if (!user || !(await user.comparePassword(userData.password))) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generar token JWT
        const token = jwt.sign({ user: user.id }, secretKey , { expiresIn: '1h' });

        // Establecer token en una cookie
        res.cookie('token', token, { httpOnly: true });

        return res.json({
          success: true,
          message: "Login successful",
          user: user,
        });
      }
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ error: "Unable to login" });
    }
  }

  // Método para cerrar sesión
  async logout(req, res) {
    try {

      // Eliminar el token de la cookie
      res.clearCookie('token');

      // Enviar respuesta de éxito
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }
  }

  // Método para restablecer la contraseña de contraseña
  async resetPassword(req, res) {
    try {
      // Implementar el código para restablecer la、、contrASENA
      return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      // Manejo de errores
      return res.status(500).json({ error: "Error al restablecer contrASENA" });
    }
  }
}

module.exports = AuthController;
