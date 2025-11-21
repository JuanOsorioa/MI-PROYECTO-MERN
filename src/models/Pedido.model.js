const mongoose = require('mongoose');

const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const PedidoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto',
                required: true
            },
            name: { type: String },
            quantity: { type: Number, required: true, min: [1, 'La cantidad debe ser al menos 1.'] },
            price: { type: Number, required: true, min: [0, 'El precio no puede ser negativo.'] },
            personalizations: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Personalizacion'
                }
            ]
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: [0, 'El monto total no puede ser negativo.']
    },
    status: {
        type: String,
        enum: ORDER_STATUSES,
        default: 'pending'
    },
    shippingAddress: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pedido', PedidoSchema);
