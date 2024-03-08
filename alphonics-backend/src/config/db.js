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

// Conecta a la base de datos y sincroniza los modelos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos");
    return sequelize.sync({ alter : true });
  })
  .then(() => {
    console.log("Los modelos han sido sincronizados");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

// Exporta la instancia de Sequelize para que pueda ser utilizada en otros archivos
module.exports = sequelize;