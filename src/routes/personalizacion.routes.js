const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const {
    createPersonalizacion,
    getPersonalizaciones,
    getPersonalizacionById,
    updatePersonalizacion,
    deletePersonalizacion
} = require('../controllers/personalizacion.controller');

router.route('/')
    .get(getPersonalizaciones)
    .post(protect, authorize('admin'), createPersonalizacion);

router.route('/:id')
    .get(getPersonalizacionById)
    .put(protect, authorize('admin'), updatePersonalizacion)
    .delete(protect, authorize('admin'), deletePersonalizacion);

module.exports = router;
