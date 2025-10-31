// MI-PROYECTO-MERN/backend/controllers/auth.controller.js

import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/usuario.js';

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
    const { nombre, correo, contraseña } = req.body;

    // 1. Validar si el usuario ya existe
    const userExists = await User.findOne({ correo });

    if (userExists) {
        res.status(400); // Bad Request
        throw new Error('El usuario ya está registrado con ese correo.');
    }

    // 2. Crear el nuevo usuario (el hash se hace en el middleware del modelo)
    const user = await User.create({
        nombre,
        correo,
        contraseña,
    });

    if (user) {
        res.status(201).json({ // Created
            _id: user._id,
            nombre: user.nombre,
            correo: user.correo,
            rol: user.rol,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Datos de usuario inválidos.');
    }
});

// @desc    Autenticar un Socio (Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { correo, contraseña } = req.body;

    // 1. Buscar usuario por correo, incluyendo la contraseña para la validación
    const user = await User.findOne({ correo }).select('+contraseña');

    // 2. Validar la existencia del usuario y la contraseña
    if (user && (await user.matchPassword(contraseña))) {
        res.json({
            _id: user._id,
            nombre: user.nombre,
            correo: user.correo,
            rol: user.rol,
            token: generateToken(user._id),
        });
    } else {
        res.status(401); // Unauthorized
        throw new Error('Credenciales inválidas (correo o contraseña incorrectos).');
    }
});

export {
    registerUser,
    loginUser,
};