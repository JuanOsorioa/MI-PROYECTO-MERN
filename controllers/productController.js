 import Product from '../models/Product.js';
 // Obtener todos los productos (GET)
 export const obtenerTodosLosProductos = async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al obtener los productos' });
  }
 };
 // Obtener un solo producto por ID (GET)
 export const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al obtener el producto' });
  }
 };
 // Crear un nuevo producto (POST)
 export const crearProducto = async (req, res) => {
  const nuevoProducto = new Product(req.body);
  console.log(nuevoProducto)
  try {
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
   // console.error(error); // Para debugging
    res.status(500).json({ mensaje: 'Hubo un error al crear el producto' });
  }
 };
 // Actualizar un producto existente (PUT)
 export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    const productoActualizado = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true 
});
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al actualizar el producto' });
  }
 };
 // Eliminar un producto (DELETE)
 export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al eliminar el producto' });
  }
 };