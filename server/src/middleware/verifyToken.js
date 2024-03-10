const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // Debes usar la misma clave secreta que usaste para firmar la token

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user; // Añadir el ID de usuario a la solicitud para su uso en rutas protegidas
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

module.exports = verifyToken;