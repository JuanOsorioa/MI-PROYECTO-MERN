// FondoUCC/src/middleware/auth.middleware.js

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User.model');

// Middleware principal: Protege rutas de acceso público
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Revisar si el token existe en el encabezado
    // El formato esperado es: "Bearer <token>"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 2. Obtener el token (quitar "Bearer ")
            token = req.headers.authorization.split(' ')[1];

            // 3. Verificar el token y decodificar el ID del usuario
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Buscar el usuario por ID y adjuntarlo al objeto de la solicitud (sin la contraseña)
            // Esto nos permitirá acceder al usuario en cualquier controlador protegido mediante req.user
            req.user = await User.findById(decoded.id).select('-password');

            // Si el usuario no existe (ej. fue eliminado), negar acceso
            if (!req.user) {
                res.status(401); // No autorizado
                throw new Error('Socio no encontrado o token inválido.');
            }

            // 5. Continuar al siguiente middleware/controlador
            next();
        } catch (error) {
            console.error(error);
            res.status(401); // No autorizado
            throw new Error('Token inválido o expirado.');
        }
    }

    // Si no hay token en el encabezado, negar el acceso
    if (!token) {
        res.status(401); // No autorizado
        throw new Error('No autorizado, no se proporcionó token.');
    }
});

// Middleware para verificar si el usuario tiene un rol permitido
// Recibe un array de roles permitidos (ej: ['admin'])
const authorize = (roles = []) => {
    // Si se pasa un solo rol, lo convertimos a array
    if (typeof roles === 'string') {
        roles = [roles];
    }

    // Retorna el middleware de Express
    return (req, res, next) => {
        // Si no hay roles requeridos, o si el rol del usuario está incluido en los roles permitidos
        if (roles.length && !roles.includes(req.user.role)) {
            // Usuario no tiene el rol necesario
            res.status(403); // Prohibido (Forbidden)
            throw new Error(`Acceso denegado. Rol '${req.user.role}' no autorizado.`);
        }

        // El usuario está autorizado
        next();
    };
};

module.exports = { protect, authorize }; // Exportamos ambos