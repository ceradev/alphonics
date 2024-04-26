const User = require("../models/User");
const Playlist = require("../models/Playlist");

export default async function createTestUsers() {
  try {
    // Elimina todas las playlists existentes
    await Playlist.destroy({ where: {} });

    // Elimina todos los usuarios existentes
    await User.destroy({ where: {} });

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