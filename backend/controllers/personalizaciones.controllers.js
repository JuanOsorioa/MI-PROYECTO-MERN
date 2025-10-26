import Personalizacion from '../models/personalizaciones.js';

export const obtenerTodasLasPersonalizaciones = async (req, res) => {
  try {
    const personalizaciones = await Personalizacion.find();
    res.json(personalizaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las personalizaciones' });
  }
};

export const obtenerPersonalizacionPorId = async (req, res) => {
  try {
    const personalizacion = await Personalizacion.findById(req.params.id);
    if (!personalizacion) return res.status(404).json({ mensaje: 'No encontrada' });
    res.json(personalizacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la personalización' });
  }
};

export const crearPersonalizacion = async (req, res) => {
  const nuevaPersonalizacion = new Personalizacion(req.body);
  try {
    const guardada = await nuevaPersonalizacion.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la personalización' });
  }
};

export const actualizarPersonalizacion = async (req, res) => {
  try {
    const personalizacion = await Personalizacion.findById(req.params.id);
    if (!personalizacion) return res.status(404).json({ mensaje: 'No encontrada' });
    const actualizada = await Personalizacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la personalización' });
  }
};

export const eliminarPersonalizacion = async (req, res) => {
  try {
    const personalizacion = await Personalizacion.findById(req.params.id);
    if (!personalizacion) return res.status(404).json({ mensaje: 'No encontrada' });
    await Personalizacion.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la personalización' });
  }
};
