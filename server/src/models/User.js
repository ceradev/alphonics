const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/db");
const Playlist = require("./Playlist");

class User extends Model {
  static associate(models) {
    User.hasMany(models.Playlist, {
      foreignKey: 'user_id',
      as: 'playlists',
    });
  }

  async comparePassword(candidatePassword) {
    console.log(candidatePassword, this.password);
    return await bcrypt.compare(candidatePassword, this.password);
  }

  async addPlaylists(playlists) {
    await this.$add('playlists', playlists);
    return this;
  }

  async addPlaylist(playlist) {
    await this.addPlaylists([playlist]);
  }

  async createPlaylist(playlistData) {
    const playlist = await Playlist.create(playlistData);
    await this.addPlaylist(playlist);
    return playlist;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 30], // Longitud mínima y máxima para el nombre de usuario
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true, // Verificación del formato de correo electrónico
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        console.log(user.password);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        console.log(hashedPassword);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        }
      },
    },
  }
);

module.exports = User;