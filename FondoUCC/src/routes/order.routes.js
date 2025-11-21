// FondoUCC/src/routes/order.routes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
} = require('../controllers/order.controller');

// Todas las rutas requieren autenticación
router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getUserOrders);
router.get('/:orderId', getOrderById);
router.patch('/:orderId/cancel', cancelOrder);

module.exports = router;