const User  = require("../models/User.js");

class AuthController {

  // Método para registrar un nuevo usuario
  signup = async (req, res) => {
    try {
      const userData = req.body;

      // Validación de datos de usuario
      const validationError = this.validateUserData.bind(this)(userData);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      // Verificar duplicados en la base de datos
      const existingUser = await User.findOne({
        where: [{ username: userData.username }, { email: userData.email }],
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Username or email already exists" });
      }

      // Crear usuario en la base de datos
      const user = await User.create(userData);

      // Generar token JWT
      const accessToken = this.generateToken.bind(this)(user.id);

      // Establecer tokens en cookies
      res.cookie("accessToken", accessToken);

      return res
        .status(201)
        .json({
          success: true,
          message: "User registered successfully",
          user: { id: user.id, token: accessToken },
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Unable to register user" });
    }
  };

  // Método para iniciar sesión
  login = async (req, res) => {
    try {
      const userData = req.body;

      // Validación de datos de usuario
      const validationError = this.validateLoginData.bind(this)(userData);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      // Autenticar al usuario en la base de datos
      const user = await User.findOne({
        where: { username: userData.username },
      });

      if (!user || !(await user.comparePassword(userData.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generar token JWT
      const accessToken = this.generateToken.bind(this)(user.id);

      // Establecer tokens en cookies
      res.cookie("accessToken", accessToken);

      return res
        .status(200)
        .json({
          success: true,
          message: "Login successful",
          user: { id: user.id, token: accessToken },
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Unable to login" });
    }
  };

  // Método para cerrar sesión
  logout = (req, res) => {
    try {
      // Eliminar token de la cookie de acceso y refresco
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: "Unable to logout",
      });
    }
  };

  // Método para restablecer la contraseña del usuario
  resetPassword = async (req, res) => {
    try {
      const { password, newPassword } = req.body;

      // Validación de datos de usuario
      const validationError = this.validateResetData.bind(this)(
        password,
        newPassword
      );
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      // Autenticar al usuario en la base de datos
      const user = await User.findOne({
        where: { password },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
        });
      }

      // Actualizar la contraseña del usuario
      await user.update({ password: newPassword });

      return res.status(200).json({
        success: true,
        message: "Password reset successful",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: "Unable to reset password",
      });
    }
  };

  // Función para validar datos de usuario
  validateUserData(userData) {
    if (!userData) {
      return "Please provide user data";
    } else if (!userData.username || !userData.email || !userData.password) {
      return "User data is incomplete";
    } else if (userData.username.length < 3 || userData.username.length > 30) {
      return "Username must be between 3 and 30 characters";
    } else if (!userData.email.includes("@") || !userData.email.includes(".")) {
      return "Invalid email address";
    } else if (userData.password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    return null;
  }

  // Función para validar datos de inicio de sesión
  validateLoginData(userData) {
    if (!userData) {
      return "User data is required";
    } else if (!userData.username || !userData.password) {
      return "User data is incomplete";
    } else if (userData.username.length < 3 || userData.username.length > 30) {
      return "Username must be between 3 and 30 characters";
    } else if (userData.password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    return null;
  }

  // Función para generar token JWT
  generateToken(userId) {
    const jwt = require("jsonwebtoken");
    // Credenciales del token
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN, {
      expiresIn: "1d",
    });
  }
}

module.exports = AuthController;