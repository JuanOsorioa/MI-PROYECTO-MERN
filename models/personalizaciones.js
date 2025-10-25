import mongoose from "mongoose";

const personalizacionSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    productoBase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    detalles: {
      type: String,
      required: true,
      trim: true,
    },
    precioFinal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Personalizacion = mongoose.model("Personalizacion", personalizacionSchema);
export default Personalizacion;
