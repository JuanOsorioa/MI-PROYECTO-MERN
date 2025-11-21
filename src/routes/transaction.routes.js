// FondoUCC/src/routes/transaction.routes.js (Actualizado)

const express = require('express');
const router = express.Router();
// Importar 'authorize' del middleware de autenticación
const { protect, authorize } = require('../middleware/auth.middleware');
const {
    createTransaction,
    getUserTransactions,
    getUserBalance, // Importar
    getGeneralFundBalance // Importar
} = require('../controllers/transaction.controller');

// Rutas protegidas: Requieren JWT
router.route('/')
    .post(protect, createTransaction)
    .get(protect, getUserTransactions);

// Rutas de Balance
// Balance personal: Accesible por cualquier socio
router.get('/balance/me', protect, getUserBalance);

// Balance general: Accesible solo por el administrador
// Requiere 'protect' (autenticado) y 'authorize' (rol 'admin')
router.get('/balance/general', protect, authorize('admin'), getGeneralFundBalance);

module.exports = router;