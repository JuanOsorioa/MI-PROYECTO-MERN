import express from "express";
import {
  obtenerTodasLasPersonalizaciones,
  obtenerPersonalizacionPorId,
  crearPersonalizacion,
  actualizarPersonalizacion,
  eliminarPersonalizacion,
} from "../controllers/personalizaciones.controllers.js";

const router = express.Router();

router.get("/", obtenerTodasLasPersonalizaciones);
router.get("/:id", obtenerPersonalizacionPorId);
router.post("/", crearPersonalizacion);
router.put("/:id", actualizarPersonalizacion);
router.delete("/:id", eliminarPersonalizacion);

export default router;
