const User = require('../models/User'); // Asegúrate de que la ruta sea correcta

async function createTestUsers() {
  try {

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
    console.error('Error al crear usuarios de prueba:', error);
  }
}

module.exports = createTestUsers;
