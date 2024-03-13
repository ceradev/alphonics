const jwt = require('jsonwebtoken');
const secretKeyAccessToken = process.env.ACCESS_TOKEN; // Clave secreta para el token de acceso
const secretKeyRefreshToken = process.env.REFRESH_TOKEN; // Clave secreta para el token de refresco

function verifyToken(req, res, next) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || !refreshToken) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    // Verificar y decodificar el token de acceso
    const decodedAccessToken = jwt.verify(accessToken, secretKeyAccessToken);
    req.user = decodedAccessToken.user; // Añadir el ID de usuario a la solicitud para su uso en rutas protegidas
    next();
  } catch (errorAccessToken) {
    try {
      // Verificar y decodificar el token de refresco
      const decodedRefreshToken = jwt.verify(refreshToken, secretKeyRefreshToken);
      // En este punto, si el token de refresco es válido, podrías generar un nuevo token de acceso y establecerlo en la cookie de acceso nuevamente
      const newAccessToken = generateNewAccessToken(decodedRefreshToken.userId); // Por ejemplo, suponiendo que tienes una función para generar un nuevo token de acceso
      res.cookie('accessToken', newAccessToken, { httpOnly: true });
      req.user = decodedRefreshToken.userId; // Añadir el ID de usuario a la solicitud para su uso en rutas protegidas
      next();
    } catch (errorRefreshToken) {
      return res.status(401).json({ error: 'Unauthorized: Invalid tokens' });
    }
  }
}

module.exports = verifyToken;
