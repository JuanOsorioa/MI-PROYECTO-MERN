// FondoUCC/src/controllers/transaction.controller.js

const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction.model');

// @desc    Registrar una nueva transacción (Aporte o Retiro)
// @route   POST /api/transactions
// @access  Private
const createTransaction = asyncHandler(async (req, res) => {
    // req.user viene del middleware 'protect'
    const userId = req.user._id;
    const { type, amount, description } = req.body;

    // 1. Validaciones básicas de entrada
    if (!type || !amount) {
        res.status(400);
        throw new Error('Faltan campos: El tipo y el monto son obligatorios.');
    }

    // 2. Validar tipo de transacción
    if (!['contribution', 'withdrawal'].includes(type.toLowerCase())) {
        res.status(400);
        throw new Error('Tipo de transacción inválido. Debe ser "contribution" o "withdrawal".');
    }

    // 3. Validación de balance (CRÍTICO para Retiros)
    if (type.toLowerCase() === 'withdrawal') {
        // En un sistema robusto, aquí se debería calcular el balance actual del socio.
        // Por ahora, implementaremos una validación simple y el cálculo complejo se deja para el balance general.
        // Para una validación en tiempo real, necesitaríamos una consulta de agregación.
        // Simularemos una validación de balance más robusta en el siguiente módulo (Balance).
        // Por ahora, solo permitimos retiros si el monto es positivo.
        if (amount <= 0) {
            res.status(400);
            throw new Error('El monto del retiro debe ser mayor a cero.');
        }
    }


    // 4. Crear la transacción en la DB
    const transaction = await Transaction.create({
        user: userId, // Referencia automática al socio logueado
        type: type.toLowerCase(),
        amount: amount,
        description: description || (type === 'contribution' ? 'Aporte mensual' : 'Retiro del fondo'),
    });

    if (transaction) {
        res.status(201).json({
            message: `Transacción de ${type} registrada exitosamente.`,
            data: transaction,
        });
    } else {
        res.status(500);
        throw new Error('No se pudo registrar la transacción.');
    }
});

// @desc    Obtener el historial de transacciones del socio logueado
// @route   GET /api/transactions
// @access  Private
const getUserTransactions = asyncHandler(async (req, res) => {
    // Solo mostramos transacciones hechas por el usuario logueado
    const transactions = await Transaction.find({ user: req.user._id })
        .sort({ date: -1 }) // Ordenar por fecha descendente
        .limit(50); // Limitar a 50 transacciones recientes

    res.status(200).json(transactions);
});

// @desc    Obtener el balance (saldo) personal del socio logueado
// @route   GET /api/transactions/balance/me
// @access  Private
const getUserBalance = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Pipeline de Agregación para calcular el saldo
    const balanceResult = await Transaction.aggregate([
        {
            // 1. Filtrar solo las transacciones del socio logueado
            $match: { user: userId }
        },
        {
            // 2. Agrupar todas las transacciones filtradas en un solo documento
            $group: {
                _id: null, // Agrupa todo
                total: {
                    $sum: {
                        $cond: [
                            // Si el tipo es 'contribution', sumar el monto
                            { $eq: ['$type', 'contribution'] },
                            '$amount',
                            // Si es 'withdrawal', restar (multiplicar por -1)
                            { $multiply: ['$amount', -1] }
                        ]
                    }
                }
            }
        },
        {
            // 3. Proyectar solo el campo 'total' y eliminar el '_id'
            $project: {
                _id: 0,
                balance: '$total'
            }
        }
    ]);

    // Si hay resultado, devolver el balance. Si no hay transacciones, el balance es 0.
    const balance = balanceResult.length > 0 ? balanceResult[0].balance : 0;

    res.status(200).json({ balance });
});


// @desc    Obtener el balance (saldo) total del Fondo UCC
// @route   GET /api/transactions/balance/general
// @access  Private/Admin
const getGeneralFundBalance = asyncHandler(async (req, res) => {
    // Pipeline de Agregación para calcular el saldo TOTAL del fondo
    const balanceResult = await Transaction.aggregate([
        {
            // Agrupar todas las transacciones sin filtrar
            $group: {
                _id: null,
                total: {
                    $sum: {
                        $cond: [
                            { $eq: ['$type', 'contribution'] },
                            '$amount',
                            { $multiply: ['$amount', -1] }
                        ]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                generalBalance: '$total'
            }
        }
    ]);

    const generalBalance = balanceResult.length > 0 ? balanceResult[0].generalBalance : 0;

    res.status(200).json({ generalBalance });
});

module.exports = {
    createTransaction,
    getUserTransactions,
    getUserBalance, // Exportar nuevo
    getGeneralFundBalance, // Exportar nuevo
};