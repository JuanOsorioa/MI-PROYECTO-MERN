import Pedido from "../models/pedido.js";

// Obtener todos los pedidos (GET)
export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: "Hubo un error al obtener los pedidos" });
  }
};

// Obtener un pedido por ID (GET)
export const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ mensaje: "Hubo un error al obtener el pedido" });
  }
};

// Crear un pedido (POST)
export const crearPedido = async (req, res) => {
  const nuevoPedido = new Pedido(req.body);
  try {
    const pedidoGuardado = await nuevoPedido.save();
    res.status(201).json(pedidoGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: "Hubo un error al crear el pedido" });
  }
};

// Actualizar un pedido (PUT)
export const actualizarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    const pedidoActualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pedidoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Hubo un error al actualizar el pedido" });
  }
};

// Eliminar un pedido (DELETE)
export const eliminarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    await Pedido.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Hubo un error al eliminar el pedido" });
  }
};
