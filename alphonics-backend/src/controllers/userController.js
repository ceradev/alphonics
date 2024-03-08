const User = require('../models/User');
class UserController {
  // Método para obtener todos los usuarios
  getAllUsers(req, res) {
    // Lógica para obtener todos los usuarios de la base de datos
    User.findAll()
      .then((users) => {
        console.log(users);
        // Devolver la respuesta con todos los usuarios
        res.json({
          success: true,
          message: "All users retrieved successfully",
          users: users,
        });
      })
      .catch((error) => {
        console.log(error);
        // Devolver una respuesta de error
        res.status(500).json({ 
          success: false,
          message: "Error al obtener todos los usuarios",
         });
      });
  }

  // Método para obtener un usuario por su ID
  getUserById(req, res) {
    const userId = req.params.id;

    // Lógica para obtener un usuario por su ID
    User.findByPk(userId)
      .then((user) => {
        if (!user || user === null) {
          res.status(404).json({ 
            success: false,
            message: "User not found",
           });
        } else {
           res.json({
          success: true,
          message: "User retrieved successfully",
          user: user,
        });
        }
      })
      .catch((error) => {
        console.log(error);
        // Devolver una respuesta de error
        res.status(500).json({ 
          success: false, 
          message: "Error al obtener el usuario" 
        });
      });
  }
  
  // Método para actualizar un usuario existente
  updateUser(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    // Manejo de errores si los datos son inválidos
    if (userId !== userData.id) {
      res
        .status(400)
        .json({ error: "User ID in request body does not match URL" });
    } else if (!userData) {
      res.status(400).json({ error: "User data is required" });
    } else if (!userData.username || !userData.email || !userData.password) {
      res.status(400).json({ error: "User data is incomplete" });
    } else if (userData.username.length < 3 || userData.username.length > 30) {
      res
        .status(400)
        .json({ error: "Username must be between 3 and 30 characters" });
    } else if (!userData.email.includes("@") || !userData.email.includes(".")) {
      res.status(400).json({ error: "Invalid email address" });
    } else if (userData.password.length < 8) {
      res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    } else {
      // Lógica para actualizar el usuario en la base de datos
      User.update(userData, {
        where: {
          id: userId,
        },
      })
      // Devolver la respuesta con el usuario actualizado
        .then((user) => {
          res.json({
            success: true,
            message: "User updated successfully",
            user: user,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error: "Error al actualizar el usuario" });
        });
    }
  }
  // Método para eliminar un usuario
  deleteUser(req, res) {
    const userId = req.params.id;

    // Manejo de errores si los datos son inválidos
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
    } else {
      // Lógica para eliminar el usuario de la base de datos
      const deletedUser = User.destroy({
        where: {
          id: userId,
        },
      }).then((user) => {
        // Devolver la respuesta con el usuario eliminado
        res.json({
          success: true,
          message: "User deleted successfully",
          user: user,
        })
      }).catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
      })
    }
  }
}

module.exports = UserController;
