const mongoose = require('mongoose');

const PersonalizacionSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    name: {
        type: String,
        required: [true, 'El nombre de la personalización es obligatorio.']
    },
    description: {
        type: String,
        trim: true
    },
    extraPrice: {
        type: Number,
        default: 0,
        min: [0, 'El precio adicional no puede ser negativo.']
    },
    options: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Personalizacion', PersonalizacionSchema);
