import Usuario from '../models/usuario.js';

// Obtener todos los usuarios (GET)
export const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al obtener los usuarios' });
  }
};

// Obtener un usuario por ID (GET)
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al obtener el usuario' });
  }
};

// Crear un nuevo usuario (POST)
export const crearUsuario = async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  try {
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al crear el usuario' });
  }
};

// Actualizar usuario (PUT)
export const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al actualizar el usuario' });
  }
};

// Eliminar usuario (DELETE)
export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al eliminar el usuario' });
  }
};
