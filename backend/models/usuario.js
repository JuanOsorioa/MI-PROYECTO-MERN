import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    contraseña: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ["cliente", "admin"],
      default: "cliente",
    },
  },
  { timestamps: true }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
