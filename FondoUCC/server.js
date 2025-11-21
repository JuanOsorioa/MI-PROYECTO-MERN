// FondoUCC/server.js (Actualizado para tienda)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.config');
const { errorHandler, notFound } = require('./src/middleware/error.middleware');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
// 🚨 Reemplazar transactions por orders
const orderRoutes = require('./src/routes/order.routes');

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globales
app.use(express.json());
app.use(cors());

// 1. RUTAS (Endpoints)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// 🚨 Nueva ruta para Pedidos (reemplaza transactions)
app.use('/api/orders', orderRoutes);

// Ruta de prueba (actualizada para la tienda)
app.get('/', (req, res) => {
    res.status(200).json({
        message: "API Arte & Memoria en funcionamiento. Sistema de pedidos listo."
    });
});

// 2. MANEJO DE ERRORES:
app.use(notFound);
app.use(errorHandler);

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`📦 Sistema de pedidos activo en: http://localhost:${PORT}/api/orders`);
});