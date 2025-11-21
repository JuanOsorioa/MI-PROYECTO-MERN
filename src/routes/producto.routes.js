const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const {
    createProducto,
    getProductos,
    getProductoById,
    updateProducto,
    deleteProducto
} = require('../controllers/producto.controller');

router.route('/')
    .get(getProductos)
    .post(protect, authorize('admin'), createProducto);

router.route('/:id')
    .get(getProductoById)
    .put(protect, authorize('admin'), updateProducto)
    .delete(protect, authorize('admin'), deleteProducto);

module.exports = router;
