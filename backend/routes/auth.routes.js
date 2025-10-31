// MI-PROYECTO-MERN/backend/routes/auth.routes.js

import express from 'express';
// El controlador actualmente usa CommonJS (module.exports = { ... }).
// Al importar un módulo CommonJS desde ESM, se obtiene el objeto `module.exports`
// como la exportación por defecto, así que lo importamos por defecto y
// desestructuramos las funciones que necesitamos.
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

// Ruta para crear un nuevo socio
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

export default router;