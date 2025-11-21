const asyncHandler = require('express-async-handler');
const Personalizacion = require('../models/Personalizacion.model');

// @desc    Crear una personalización
// @route   POST /api/personalizaciones
// @access  Private/Admin
const createPersonalizacion = asyncHandler(async (req, res) => {
    const { product, name, description, extraPrice, options } = req.body;

    if (!product || !name) {
        res.status(400);
        throw new Error('Faltan campos: product y name son obligatorios.');
    }

    const personalizacion = await Personalizacion.create({ product, name, description, extraPrice, options });
    res.status(201).json({ message: 'Personalización creada', data: personalizacion });
});

// @desc    Obtener todas las personalizaciones
// @route   GET /api/personalizaciones
// @access  Public
const getPersonalizaciones = asyncHandler(async (req, res) => {
    const list = await Personalizacion.find().sort({ createdAt: -1 }).populate('product', 'name price');
    res.status(200).json(list);
});

// @desc    Obtener personalización por ID
// @route   GET /api/personalizaciones/:id
// @access  Public
const getPersonalizacionById = asyncHandler(async (req, res) => {
    const p = await Personalizacion.findById(req.params.id).populate('product', 'name price');
    if (!p) {
        res.status(404);
        throw new Error('Personalización no encontrada.');
    }
    res.status(200).json(p);
});

// @desc    Actualizar personalización
// @route   PUT /api/personalizaciones/:id
// @access  Private/Admin
const updatePersonalizacion = asyncHandler(async (req, res) => {
    const p = await Personalizacion.findById(req.params.id);
    if (!p) {
        res.status(404);
        throw new Error('Personalización no encontrada.');
    }

    const { name, description, extraPrice, options } = req.body;
    p.name = name ?? p.name;
    p.description = description ?? p.description;
    p.extraPrice = extraPrice ?? p.extraPrice;
    if (options) p.options = options;

    const updated = await p.save();
    res.status(200).json({ message: 'Personalización actualizada', data: updated });
});

// @desc    Eliminar personalización
// @route   DELETE /api/personalizaciones/:id
// @access  Private/Admin
const deletePersonalizacion = asyncHandler(async (req, res) => {
    const p = await Personalizacion.findById(req.params.id);
    if (!p) {
        res.status(404);
        throw new Error('Personalización no encontrada.');
    }
    await p.remove();
    res.status(200).json({ message: 'Personalización eliminada' });
});

module.exports = {
    createPersonalizacion,
    getPersonalizaciones,
    getPersonalizacionById,
    updatePersonalizacion,
    deletePersonalizacion
};
