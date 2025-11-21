const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const {
    createPedido,
    getUserPedidos,
    getAllPedidos,
    getPedidoById,
    updatePedidoStatus,
    deletePedido
} = require('../controllers/pedido.controller');

// Crear pedido y listar pedidos del usuario autenticado
router.route('/')
    .post(protect, createPedido)
    .get(protect, getUserPedidos);

// Rutas administrativas
router.get('/all', protect, authorize('admin'), getAllPedidos);
router.get('/:id', protect, getPedidoById);
router.put('/:id/status', protect, authorize('admin'), updatePedidoStatus);
router.delete('/:id', protect, authorize('admin'), deletePedido);

module.exports = router;
