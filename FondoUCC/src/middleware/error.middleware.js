// FondoUCC/src/middleware/error.middleware.js

// Middleware para manejar rutas que no existen (404 Not Found)
const notFound = (req, res, next) => {
    // Crea un objeto Error con un mensaje específico
    const error = new Error(`No Encontrado - ${req.originalUrl}`);
    // Establece el código de estado de la respuesta a 404
    res.status(404);
    // Pasa el error al siguiente middleware (el manejador de errores general)
    next(error);
};

// Middleware general de manejo de errores
const errorHandler = (err, req, res, next) => {
    // A veces, Express devuelve 200 aunque haya un error. Nos aseguramos de que sea un 500 o el status que ya se haya definido.
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode);

    // Enviar una respuesta JSON estandarizada
    res.json({
        message: err.message,
        // Mostrar el stack trace (detalles del error) SÓLO si estamos en modo desarrollo
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;
// Exportamos notFound si queremos usarlo antes de las rutas
module.exports = { errorHandler, notFound }; 