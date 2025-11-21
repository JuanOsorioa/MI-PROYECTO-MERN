// FondoUCC/src/config/db.config.js

const mongoose = require('mongoose');

// Función asíncrona para conectar a la DB
const connectDB = async () => {
    try {
        // Obtenemos la URI desde las variables de entorno
        const uri = process.env.MONGO_URI;

        if (!uri) {
            console.error("⛔ ERROR: La variable MONGO_URI no está definida en .env");
            // Terminamos la aplicación si la URI no existe, ya que es crítica
            process.exit(1);
        }

        // Conexión principal
        const conn = await mongoose.connect(uri);

        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error de conexión a MongoDB ****: ${error.message}`);
        // Salir con fallo
        process.exit(1);
    }
};

module.exports = connectDB;