 import dotenv from 'dotenv';
 import express from 'express';
 import routes from './routes/index.js';
 import routes1 from './routes/index2.js';
 import routes2 from './routes/index3.js';
 import routes3 from './routes/index4.js';
 import routes4 from './routes/index5.js';

// rutas
 import { conectarDB, dbStatus } from './config/db.js';

 dotenv.config();
 console.log(process.env.MONGO_URI)

 const app = express();
 const port = process.env.PORT || 3000;
 conectarDB();

 app.use(express.json());
 app.use('/api/productos', routes.productRoutes);
 app.use('/api/usuarios', routes1.usuarioRoutes);
 app.use("/api/pedidos", routes2.pedidoRoutes);
 app.use("/api/producto", routes3.productoRoutes);
 app.use("/api/personalizaciones", routes4.personalizacionesRoutes);


 app.get('/', (req, res) => {
    if (dbStatus === 'conectado') {
        res.send('¡Hola! Servidor funcionando y conectado a MongoDB.');
    } else {
        res.status(500).send('¡Hola! Servidor funcionando, pero hay un problema de conexión con MongoDB.');
    }
 });
 app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
 });