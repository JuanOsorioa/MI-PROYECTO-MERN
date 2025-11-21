// FondoUCC/server.js (Actualización con Transacciones)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.config');
const { errorHandler, notFound } = require('./src/middleware/error.middleware');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
// 🚨 Importar nuevas rutas de Transacciones
const transactionRoutes = require('./src/routes/transaction.routes');
// Nuevas rutas: Producto, Personalizacion, Pedido
const productoRoutes = require('./src/routes/producto.routes');
const personalizacionRoutes = require('./src/routes/personalizacion.routes');
const pedidoRoutes = require('./src/routes/pedido.routes');

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globales
app.use(express.json());
app.use(cors());

// 1. RUTAS (Endpoints)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// 🚨 Nueva ruta para Transacciones
app.use('/api/transactions', transactionRoutes);
// Rutas agregadas: productos, personalizaciones y pedidos
app.use('/api/productos', productoRoutes);
app.use('/api/personalizaciones', personalizacionRoutes);
app.use('/api/pedidos', pedidoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.status(200).json({
        message: "API Fondo UCC en funcionamiento. Transacciones listas para probar."
    });
});

// 2. MANEJO DE ERRORES:
app.use(notFound);
app.use(errorHandler);

// Arrancar el servidor (escuchar en 0.0.0.0 para aceptar conexiones locales/externas)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
    console.log(`URL: http://0.0.0.0:${PORT} (alias http://localhost:${PORT})`);
});

// Loguear eventos de proceso para depuración si el servidor termina inesperadamente
process.on('exit', (code) => {
    console.log(`Process exiting with code: ${code}`);
});
process.on('SIGINT', () => {
    console.log('Process received SIGINT (Ctrl+C)');
    process.exit(0);
});
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err && err.stack ? err.stack : err);
});

// Keep-alive for entornos de desarrollo: si por alguna razón el event loop no queda activo,
// esto evita que el proceso salga inmediatamente. Remover en producción.
setInterval(() => {}, 1e9);