import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model("Producto", productoSchema);
export default Producto;
