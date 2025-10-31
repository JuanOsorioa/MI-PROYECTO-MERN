import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Usuario from '../models/usuario.js';

// Middleware principal: Protege rutas privadas
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar usuario y adjuntarlo a req (sin contraseña)
      req.user = await Usuario.findById(decoded.id).select('-contraseña');

      if (!req.user) {
        res.status(401);
        throw new Error('Usuario no encontrado o token inválido.');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Token inválido o expirado.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No autorizado, no se proporcionó token.');
  }
});

export { protect };