// backend/controllers/producto.controllers.js
import Producto from "../models/productos.js";

// Obtener todos los productos (GET)
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ mensaje: "Hubo un error al obtener los productos", error });
  }
};

// Obtener un producto por ID (GET)
export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.status(200).json(producto);
  } catch (error) {
    console.error("Error al obtener producto por id:", error);
    res.status(500).json({ mensaje: "Hubo un error al obtener el producto", error });
  }
};

// Crear un nuevo producto (POST)
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ mensaje: "Hubo un error al crear el producto", error });
  }
};

// Actualizar un producto existente (PUT)
export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ mensaje: "Hubo un error al actualizar el producto", error });
  }
};

// Eliminar un producto (DELETE)
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

    await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ mensaje: "Hubo un error al eliminar el producto", error });
  }
};
