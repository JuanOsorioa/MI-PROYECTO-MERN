// FondoUCC/src/models/User.model.js (Actualizado)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        select: false
    },
    phone: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: USER_ROLES,
        default: 'member'
    }
}, {
    timestamps: true
});

// Middleware para hashear contraseña
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);