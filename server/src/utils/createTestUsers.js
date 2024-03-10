const User = require("../models/User"); // Asegúrate de que la ruta sea correcta
const Playlist = require("../models/Playlist");

async function createTestUsers() {
  try {

    // Elimina todas las playlists existentes
    await Playlist.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    // Elimina todos los usuarios existentes
    await User.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    // Crea algunos usuarios de prueba
    await User.create({
      name: "César Suárez",
      username: "ceradev",
      email: "lI3pN@gmail.com",
      password: "cesar123456",
    });

    await User.create({
      name: "Minghai Chen",
      username: "chen3373",
      email: "hQqkSs@gmail.com",
      password: "minghai123456",
    });

    console.log("Usuarios de prueba creados exitosamente");

    // Crea algunas playlists de prueba
    await Playlist.create({
      user_id: 1,
      name: "Playlist 1",
      description: "Descripción de la playlist 1",
      image : "https://example.com/image.jpg",
      tracks : [
        {
          name: "Canción 1",
          artist: "Artista 1",
          album: "Album 1",
          genre: "Genero 1",
          duration: "Duración 1",
        }
      ]
    })

    await Playlist.create({
      user_id: 1,
      name: "Playlist 2",
      description: "Descripción de la playlist 2",
      image : "https://example.com/image.jpg",
      tracks : [
        {
          name: "Canción 2",
          artist: "Artista 2",
          album: "Album 2",
          genre: "Genero 2",
          duration: "Duración 2",
        }
      ]
    })

    await Playlist.create({
      user_id: 2,
      name: "Playlist 3",
      description: "Descripción de la playlist 3",
      image : "https://example.com/image.jpg",
      tracks : [
        {
          name: "Canción 3",
          artist: "Artista 3",
          album: "Album 3",
          genre: "Genero 3",
          duration: "Duración 3",
        }
      ]
    });

    console.log("Playlists de prueba creadas exitosamente");

  } catch (error) {
    console.error("Error al crear usuarios de prueba y playlists:", error);
  }
}

module.exports = createTestUsers;
