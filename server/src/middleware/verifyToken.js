const secretKeyAccessToken = process.env.ACCESS_TOKEN; // Clave secreta para el token de acceso
const jwt = require('jsonwebtoken');

export default function verifyToken(req, res, next) {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    // Verificar y decodificar el token de acceso
    const decodedAccessToken = jwt.verify(accessToken, secretKeyAccessToken);
    req.user = decodedAccessToken.user; // Añadir el ID de usuario a la solicitud para su uso en rutas protegidas
    next();
  } catch (errorAccessToken) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}