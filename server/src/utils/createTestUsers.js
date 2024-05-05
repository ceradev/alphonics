const User = require("../models/User");
const Playlist = require("../models/Playlist");

async function createTestUsers() {
  try {
    // Elimina todas las playlists existentes
    await Playlist.destroy({ where: {} });

    // Elimina todos los usuarios existentes
    await User.destroy({ where: {} });

    // Crea algunos usuarios de prueba
    await User.create({
      name: "César Aramis",
      surname: "Suarez Orizondo",
      username: "ceradev",
      profilePic: "https://example.com/image.jpg",
      email: "lI3pN@gmail.com",
      password: "123456",
    });

    await User.create({
      name: "Minghai",
      surname: "Chen",
      username: "chen3373",
      profilePic: "https://example.com/image.jpg",
      email: "hQqkSs@gmail.com",
      password: "123456",
    });

    console.log("Usuarios de prueba creados exitosamente");

    // Crea algunas playlists de prueba
    await Playlist.create({
      user_id: 1,
      name: "Playlist 1",
      description: "Descripción de la playlist 1",
      image: "https://example.com/image.jpg",
      tracks: [
        "aefgaaf325425sfg",
        "safagasdgsg23526",
        "afa152sdfgsdfg",
        "sdfgdsfgsdfgdfg",
      ],
    });

    await Playlist.create({
      user_id: 1,
      name: "Playlist 2",
      description: "Descripción de la playlist 2",
      image: "https://example.com/image.jpg",
      tracks: ["aefgaaf325425sfg", "safagasdgsg23526", "afa152sdfgsdfg"],
    });

    await Playlist.create({
      user_id: 2,
      name: "Playlist 3",
      description: "Descripción de la playlist 3",
      image: "https://example.com/image.jpg",
      tracks: ["aefgaaf325425sfg", "safagasdgsg23526", "afa152sdfgsdfg"],
    });

    console.log("Playlists de prueba creadas exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios de prueba y playlists:", error);
  }
}

module.exports = createTestUsers;