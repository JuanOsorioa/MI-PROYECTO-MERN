import express from 'express';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Ruta protegida: profile
router.get('/profile', protect, (req, res) => {
  res.json({
    _id: req.user._id,
    nombre: req.user.nombre,
    correo: req.user.correo,
    rol: req.user.rol,
    message: 'Acceso concedido a la ruta protegida.',
  });
});

export default router;