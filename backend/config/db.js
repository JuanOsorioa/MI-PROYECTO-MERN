import mongoose from 'mongoose';
 let dbStatus = 'desconectado';
 const conectarDB = async () => {
    try {
        
        const db = await mongoose.connect(process.env.MONGO_URI);
        dbStatus = 'conectado';
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB Conectado en: ${url}`);
    } catch (error) {
        dbStatus = 'error';
        console.log(`error: ${error.message}`);
    }
 };
 export { conectarDB, dbStatus };