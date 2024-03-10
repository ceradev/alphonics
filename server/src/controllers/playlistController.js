const Playlist = require("../models/Playlist");
class PlaylistController {
    getAllPlaylists(req, res) {
        // Lógica para obtener todas las playlists de la base de datos
        Playlist.findAll()
            .then((playlists) => {
                console.log(playlists);
                // Devolver la respuesta con todas las playlists
                res.json({
                    success: true,
                    message: "All playlists retrieved successfully",
                    playlists: playlists,
                });
            })
            .catch((error) => {
                console.log(error);
                // Devolver una respuesta de error
                res.status(500).json({
                    success: false,
                    message: "Cannot get all playlists",
                });
            });
    }

    addSongToPlaylist(req, res) {
        const playlistId = req.params.id;
        const songId = req.body.songId;
        // Lógica para añadir una canción a una playlist
        Playlist.findByPk(playlistId)
            .then((playlist) => {
                if (!playlist) {
                    res.status(404).json({
                        success: false,
                        message: "Playlist not found",
                    });
                } else {
                    playlist.addSong(songId);
                    res.json({
                        success: true,
                        message: "Song added to playlist successfully",
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                // Devolver una respuesta de error
                res.status(500).json({
                    success: false,
                    message: "Cannot add song to playlist",
                });
            });
    }
    deleteSongFromPlaylist(req, res) {
        const playlistId = req.params.id;
        const songId = req.params.songId;
        // Lógica para eliminar una canción de una playlist
        Playlist.findByPk(playlistId)
            .then((playlist) => {
                if (!playlist) {
                    res.status(404).json({
                        success: false,
                        message: "Playlist not found",
                    });
                } else {
                    playlist.removeSong(songId);
                    res.json({
                        success: true,
                        message: "Song removed from playlist successfully",
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                // Devolver una respuesta de error
                res.status(500).json({
                    success: false,
                    message: "Cannot remove song from playlist",
                });
            });
    }
}

module.exports = PlaylistController;
