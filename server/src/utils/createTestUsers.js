const User = require('../models/User'); // Asegúrate de que la ruta sea correcta

async function createTestUsers() {
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

    // Elimina todos los usuarios existentes
    await User.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    
    // Crea algunos usuarios de prueba
    await User.create({
      full_name: 'César Suárez',
      username: 'ceradev',
      email: 'lI3pN@gmail.com',
      password: '123456',
    });

    await User.create({
      full_name: 'Minghai Chen',
      username: 'chen3373',
      email: 'hQqkSs@gmail.com',
      password: '123456',
    });

    console.log('Usuarios de prueba creados exitosamente');
  } catch (error) {
    console.error('Error al crear usuarios de prueba y playlists:', error);
  }
}

module.exports = createTestUsers;
