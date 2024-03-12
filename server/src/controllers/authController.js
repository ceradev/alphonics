const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Accede a la clave secreta desde el archivo .env
const secretKey = process.env.JWT_SECRET;

class AuthController {
  // Método para registrar un nuevo usuario
  async register(req, res) {
    try {
      const userData = req.body;

      // Validación de datos de usuario
      const validationError = validateUserData(userData);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      // Verificar duplicados en la base de datos
      const existingUser = await User.findOne({
        where: [{ username: userData.username }, { email: userData.email }],
      });

      if (existingUser) {
        return res.status(400).json({ error: "Username or email already exists" });
      }

      // Crear usuario en la base de datos
      const user = await User.create(userData);

      // Generar token JWT
      const token = generateToken(user.id);

      // Establecer token en una cookie
      res.cookie("token", token, { httpOnly: true });

      return res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Unable to register user" });
    }
  }

  // Método para iniciar sesión
  async login(req, res) {
    try {
      const userData = req.body;

      // Validación de datos de usuario
      const validationError = validateLoginData(userData);
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
      const token = generateToken(user.id);

      // Establecer token en una cookie
      res.cookie("token", token, { httpOnly: true });

      return res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Unable to login" });
    }
  }

  // Otros métodos...

  // Función para validar datos de usuario
  validateUserData(userData) {
    if (!userData) {
      return "Please provide user data";
    } else if (!userData.username || !userData.email || !userData.password) {
      return "User data is incomplete";
    } else if (
      userData.username.length < 3 ||
      userData.username.length > 30
    ) {
      return "Username must be between 3 and 30 characters";
    } else if (
      !userData.email.includes("@") ||
      !userData.email.includes(".")
    ) {
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
    } else if (
      userData.username.length < 3 ||
      userData.username.length > 30
    ) {
      return "Username must be between 3 and 30 characters";
    } else if (userData.password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    return null;
  }

  // Función para generar token JWT
  generateToken(userId) {
    return jwt.sign(
      { id: userId },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
  }
}