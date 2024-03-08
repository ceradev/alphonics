const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const userController = new UserController();

// Ruta para obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/:id', userController.getUserById);

// Ruta para actualizar un usuario existente
router.put('/:id', userController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;