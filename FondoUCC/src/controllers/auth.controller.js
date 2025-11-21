// FondoUCC/src/controllers/auth.controller.js

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// --- Helper: Generar JWT ---
// Centralizamos la creación del token para reutilizar
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// @desc    Registrar un nuevo Socio
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Validar si el usuario ya existe
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400); // Bad Request
        throw new Error('El socio ya está registrado con ese email.');
    }

    // 2. Crear el nuevo usuario (el hash se hace en el middleware del modelo)
    const user = await User.create({
        name,
        email,
        password,
        // Rol por defecto es 'member'
    });

    if (user) {
        res.status(201).json({ // Created
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Datos de socio inválidos.');
    }
});

// @desc    Autenticar un Socio (Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Buscar usuario por email, incluyendo la contraseña para la validación
    // .select('+password') es necesario porque en el modelo pusimos 'select: false'
    const user = await User.findOne({ email }).select('+password');

    // 2. Validar la existencia del usuario y la contraseña
    // user.matchPassword es el método que definimos en User.model.js
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401); // Unauthorized
        throw new Error('Credenciales inválidas (email o contraseña incorrectos).');
    }
});

module.exports = {
    registerUser,
    loginUser,
};