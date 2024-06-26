const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// Configuración de la base de datos
const dbConfig = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Crea una instancia de Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: "mysql",
  }
);

// Exporta la instancia de Sequelize
module.exports = sequelize;