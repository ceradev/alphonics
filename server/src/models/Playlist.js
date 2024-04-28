const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Playlist extends Model {
  static associate(models) {
    Playlist.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

// Función para anadir una cancion a una playlist
function addSong(songId) {
  this.tracks.push(songId);
  return this.save();
}

// Función para eliminar una cancion de una playlist
function removeSong(songId) {
  const index = this.tracks.indexOf(songId);
  if (index !== -1) {
    this.tracks.splice(index, 1);
  }
  return this.save();
}

Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
        len: [0, 255],
      },
    },
    tracks: {
      type: DataTypes.JSON, // Cambiado a JSON para almacenar una lista de tracks
      allowNull: false,
      defaultValue: [],
      validate: {
        isValidArray(value) {
          if (!Array.isArray(value)) {
            throw new Error("Tracks must be an array.");
          }
        },
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Playlist",
    tableName: "playlists",
    timestamps: false,
  }
);

module.exports = Playlist;