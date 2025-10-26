 import express from 'express';
 import {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
 } from '../controllers/productController.js';
 const router = express.Router();
 router.get('/', obtenerTodosLosProductos);
 router.get('/:id', obtenerProductoPorId);
 router.post('/', crearProducto);
 router.put('/:id', actualizarProducto);
 router.delete('/:id', eliminarProducto);
 export default router;