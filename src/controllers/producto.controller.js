const asyncHandler = require('express-async-handler');
const Producto = require('../models/Producto.model');

// @desc    Crear un nuevo producto
// @route   POST /api/productos
// @access  Private/Admin
const createProducto = asyncHandler(async (req, res) => {
    const { name, description, price, stock } = req.body;

    if (!name || price == null) {
        res.status(400);
        throw new Error('Faltan campos: nombre y precio son obligatorios.');
    }

    const producto = await Producto.create({ name, description, price, stock });

    res.status(201).json({ message: 'Producto creado', data: producto });
});

// @desc    Obtener todos los productos
// @route   GET /api/productos
// @access  Public
const getProductos = asyncHandler(async (req, res) => {
    const productos = await Producto.find().sort({ createdAt: -1 });
    res.status(200).json(productos);
});

// @desc    Obtener un producto por ID
// @route   GET /api/productos/:id
// @access  Public
const getProductoById = asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
        res.status(404);
        throw new Error('Producto no encontrado.');
    }
    res.status(200).json(producto);
});

// @desc    Actualizar un producto
// @route   PUT /api/productos/:id
// @access  Private/Admin
const updateProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
        res.status(404);
        throw new Error('Producto no encontrado.');
    }

    const { name, description, price, stock, active } = req.body;
    producto.name = name ?? producto.name;
    producto.description = description ?? producto.description;
    producto.price = price ?? producto.price;
    producto.stock = stock ?? producto.stock;
    if (active !== undefined) producto.active = active;

    const updated = await producto.save();
    res.status(200).json({ message: 'Producto actualizado', data: updated });
});

// @desc    Eliminar un producto
// @route   DELETE /api/productos/:id
// @access  Private/Admin
const deleteProducto = asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
        res.status(404);
        throw new Error('Producto no encontrado.');
    }
    await producto.remove();
    res.status(200).json({ message: 'Producto eliminado' });
});

module.exports = {
    createProducto,
    getProductos,
    getProductoById,
    updateProducto,
    deleteProducto
};
