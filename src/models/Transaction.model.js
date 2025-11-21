// FondoUCC/src/models/Transaction.model.js

const mongoose = require('mongoose');

// Tipos de transacciones permitidas
const TRANSACTION_TYPES = ['contribution', 'withdrawal'];

const TransactionSchema = new mongoose.Schema({
    user: {
        // Relación: Referencia al ID del Socio que realiza la transacción
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Nombre del modelo al que se refiere
        required: true
    },
    type: {
        type: String,
        required: [true, 'El tipo de transacción es obligatorio.'],
        enum: TRANSACTION_TYPES // 'contribution' (aporte) o 'withdrawal' (retiro)
    },
    amount: {
        type: Number,
        required: [true, 'El monto es obligatorio.'],
        min: [1, 'El monto debe ser positivo.'] // Evitar transacciones de monto cero o negativo
    },
    description: {
        type: String,
        trim: true,
        maxlength: [200, 'La descripción no debe exceder los 200 caracteres.']
    },
    date: {
        type: Date,
        default: Date.now // Fecha y hora de la transacción
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);