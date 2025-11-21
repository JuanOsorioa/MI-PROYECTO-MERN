// FondoUCC/src/controllers/order.controller.js
const Order = require('../models/Order.model');

// @desc    Crear nuevo pedido
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, contactInfo, notes } = req.body;

    const order = new Order({
      userId: req.user._id,
      items,
      totalAmount,
      shippingAddress,
      contactInfo: {
        phone: contactInfo?.phone || '',
        email: contactInfo?.email || req.user.email
      },
      notes
    });

    const createdOrder = await order.save();
    
    res.status(201).json({
      success: true,
      message: 'Pedido creado exitosamente',
      order: createdOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el pedido',
      error: error.message
    });
  }
};

// @desc    Obtener pedidos del usuario
// @route   GET /api/orders/my-orders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los pedidos',
      error: error.message
    });
  }
};

// @desc    Obtener un pedido específico
// @route   GET /api/orders/:orderId
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el pedido',
      error: error.message
    });
  }
};

// @desc    Cancelar pedido
// @route   PATCH /api/orders/:orderId/cancel
// @access  Private
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    if (order.status === 'completado') {
      return res.status(400).json({
        success: false,
        message: 'No se puede cancelar un pedido completado'
      });
    }

    order.status = 'cancelado';
    await order.save();

    res.json({
      success: true,
      message: 'Pedido cancelado exitosamente',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cancelar el pedido',
      error: error.message
    });
  }
};