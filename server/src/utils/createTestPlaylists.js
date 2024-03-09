const Playlist = require('../models/Playlist');

async function createTestPlaylists() {
    try {
        // Elimina todas las playlists existentes
        await Playlist.destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });

        // Crea algunas playlists de prueba
        await Playlist.create({
            name: 'Playlist 1',
            description: 'Descripción de la playlist 1',
            image: 'https://example.com/image1.jpg',
            tracks: ['track1', 'track2'],
            user_id: 1,
        });

        await Playlist.create({
            name: 'Playlist 2',
            description: 'Descripción de la playlist 2',
            image: 'https://example.com/image2.jpg',
            tracks: ['track3', 'track4'],
            user_id: 1,
        });

        await Playlist.create({
            name: 'Playlist 3',
            description: 'Descripción de la playlist 3',
            image: 'https://example.com/image3.jpg',
            tracks: ['track5', 'track6'],
            user_id: 2,
        });

        console.log('Playlists de prueba creadas exitosamente');

    } catch (error) {
        console.error('Error al crear playlists de prueba:', error);
    }
}

module.exports = createTestPlaylists;