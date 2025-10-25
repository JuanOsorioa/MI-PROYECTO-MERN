import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "enviado", "entregado"],
      default: "pendiente",
    },
  },
  { timestamps: true }
);

const Pedido = mongoose.model("Pedido", pedidoSchema);
export default Pedido;
