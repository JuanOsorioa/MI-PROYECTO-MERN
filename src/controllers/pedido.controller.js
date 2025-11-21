const asyncHandler = require('express-async-handler');
const Pedido = require('../models/Pedido.model');

// @desc    Crear un pedido para el usuario autenticado
// @route   POST /api/pedidos
// @access  Private
const createPedido = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { items, totalAmount, shippingAddress } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400);
        throw new Error('El pedido debe contener al menos un ítem.');
    }

    if (totalAmount == null) {
        res.status(400);
        throw new Error('El monto total es obligatorio.');
    }

    const pedido = await Pedido.create({ user: userId, items, totalAmount, shippingAddress });
    res.status(201).json({ message: 'Pedido creado', data: pedido });
});

// @desc    Obtener pedidos del usuario autenticado
// @route   GET /api/pedidos
// @access  Private
const getUserPedidos = asyncHandler(async (req, res) => {
    const pedidos = await Pedido.find({ user: req.user._id }).sort({ createdAt: -1 }).populate('items.product', 'name price');
    res.status(200).json(pedidos);
});

// @desc    Obtener todos los pedidos (admin)
// @route   GET /api/pedidos/all
// @access  Private/Admin
const getAllPedidos = asyncHandler(async (req, res) => {
    const pedidos = await Pedido.find().sort({ createdAt: -1 }).populate('user', 'name email').populate('items.product', 'name price');
    res.status(200).json(pedidos);
});

// @desc    Obtener pedido por ID (si es del usuario o admin)
// @route   GET /api/pedidos/:id
// @access  Private
const getPedidoById = asyncHandler(async (req, res) => {
    const pedido = await Pedido.findById(req.params.id).populate('user', 'name email').populate('items.product', 'name price').populate('items.personalizations');
    if (!pedido) {
        res.status(404);
        throw new Error('Pedido no encontrado.');
    }

    // Permitir acceso si es el dueño o admin
    if (pedido.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('No autorizado para ver este pedido.');
    }

    res.status(200).json(pedido);
});

// @desc    Actualizar estado del pedido (admin)
// @route   PUT /api/pedidos/:id/status
// @access  Private/Admin
const updatePedidoStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
        res.status(404);
        throw new Error('Pedido no encontrado.');
    }
    pedido.status = status ?? pedido.status;
    const updated = await pedido.save();
    res.status(200).json({ message: 'Estado del pedido actualizado', data: updated });
});

// @desc    Eliminar pedido (admin)
// @route   DELETE /api/pedidos/:id
// @access  Private/Admin
const deletePedido = asyncHandler(async (req, res) => {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
        res.status(404);
        throw new Error('Pedido no encontrado.');
    }
    await pedido.remove();
    res.status(200).json({ message: 'Pedido eliminado' });
});

module.exports = {
    createPedido,
    getUserPedidos,
    getAllPedidos,
    getPedidoById,
    updatePedidoStatus,
    deletePedido
};
