import mongoose from 'mongoose';
 const productSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    }
 }, {
    timestamps: true
 });
 const Product = mongoose.model('Producto', productSchema);
 export default Product;