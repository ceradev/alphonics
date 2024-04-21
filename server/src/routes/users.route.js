const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const userController = new UserController();

// Ruta para obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Ruta para obtener las playlists de un usuario por su ID
router.get('/:id/playlists', userController.getUserPlaylists);

// Ruta para obtener una playlist por su ID de usuario y su ID de playlist
router.get('/:id/playlists/:playlist_id', userController.getUserPlaylistById);

// Ruta para crear una playlist para un usuario por su ID de usuario
router.post('/:id/playlists', userController.createUserPlaylist);

// Ruta para modificar una playlist por su ID de usuario y su ID de playlist
router.put('/:id/playlists/:playlist_id', userController.updateUserPlaylistById);

// Ruta para eliminar una playlist por su ID de usuario y su ID de playlist
router.delete('/:id/playlists/:playlist_id', userController.deleteUserPlaylistById);

// Ruta para obtener un usuario por su ID
router.get('/:id', userController.getUserById);

// Ruta para actualizar un usuario existente
router.put('/:id', userController.updateUser);

module.exports = router;