 // server.js

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'; // ✅ Añadido desde el segundo código
import routes from './routes/index.js';
import routes1 from './routes/index2.js';
import routes2 from './routes/index3.js';
import routes3 from './routes/index4.js';
import routes4 from './routes/index5.js';

// ✅ Nueva ruta de autenticación (como en el segundo código)
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

// conexión
import { conectarDB, dbStatus } from './config/db.js';

dotenv.config();
console.log('🔗 Conectando a MongoDB URI:', process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 3000;

// ✅ Conexión a la base de datos
conectarDB();

// ✅ Middlewares globales
app.use(express.json());
app.use(cors()); // ✅ Soporte CORS

// ✅ Rutas principales del primer código
app.use('/api/productos', routes.productRoutes);
app.use('/api/usuarios', routes1.usuarioRoutes);
app.use('/api/pedidos', routes2.pedidoRoutes);
app.use('/api/producto', routes3.productoRoutes);
app.use('/api/personalizaciones', routes4.personalizacionesRoutes);

// ✅ Nueva ruta de autenticación
app.use('/api/auth', authRoutes);

// ✅ Rutas protegidas para usuarios
app.use('/api/users', userRoutes);

// ✅ Ruta raíz mejorada
app.get('/', (req, res) => {
    if (dbStatus === 'conectado') {
        res.status(200).json({
            message: '🚀 Servidor funcionando y conectado a MongoDB.',
            status: 'ok',
            puerto: port,
            conexion: dbStatus
        });
    } else {
        res.status(500).json({
            message: '⚠️ Servidor funcionando, pero hay un problema con la conexión a MongoDB.',
            status: 'error',
            conexion: dbStatus
        });
    }
});

// ✅ (Opcional) Middleware de errores centralizado (comentado hasta que lo tengas creado)
// import errorHandler from './middleware/error.middleware.js';
// app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`✅ Servidor Express escuchando en http://localhost:${port}`);
});

// Manejo explícito de errores en el servidor (por ejemplo, puerto ocupado)
server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.error(`❌ Error: el puerto ${port} está en uso. Libera el puerto o cambia PORT en tu .env (por ejemplo PORT=4000).`);
        process.exit(1);
    }
    console.error('Server error:', err);
    process.exit(1);
});

 