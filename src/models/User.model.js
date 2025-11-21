// FondoUCC/src/models/User.model.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Aún no instalado, pero necesario

// Definición de Roles para la Autorización (tema del próximo módulo)
const USER_ROLES = ['member', 'admin'];

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio.'],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Por favor, usa un correo válido.']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.'],
        select: false // No devolver la contraseña en consultas por defecto
    },
    role: {
        type: String,
        enum: USER_ROLES, // Restringe los valores a 'member' o 'admin'
        default: 'member'
    }
}, {
    timestamps: true // Añade 'createdAt' y 'updatedAt' automáticamente
});

// --- Lógica de Seguridad (Pre-guardado) ---
// Middleware de Mongoose: Hashear la contraseña antes de guardar
UserSchema.pre('save', async function (next) {
    // Solo hashea si la contraseña ha sido modificada (o es nueva)
    if (!this.isModified('password')) {
        return next();
    }

    // Nota: Necesitas instalar 'bcryptjs' -> npm install bcryptjs
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas (uso en el Login)
UserSchema.methods.matchPassword = async function (enteredPassword) {
    // Nota: Necesitas añadir 'select: true' a la consulta antes de usar este método
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', UserSchema);