const Sequelize = require("sequelize");

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

// Verifica la existencia de la base de datos
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

// Verifica la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

// Exporta la instancia de Sequelize
module.exports = sequelize;