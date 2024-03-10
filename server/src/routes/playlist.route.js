const express = require('express');
const PlaylistController = require('../controllers/playlistController');
const playlistController = new PlaylistController();

const router = express.Router();

// Ruta para obtener todas las playlists
router.get('/', playlistController.getAllPlaylists);

// Ruta para añadir una canción a una playlist
router.post('/:id/songs', playlistController.addSongToPlaylist);

// Ruta para eliminar una canción de una playlist
router.delete('/:id/canciones/:songId', playlistController.deleteSongFromPlaylist);

module.exports = router;