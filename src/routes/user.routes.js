// FondoUCC/src/routes/user.routes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/users/profile
// @desc    Obtener el perfil del socio (Ruta Protegida)
// @access  Private
router.get('/profile', protect, (req, res) => {
    // Si llegamos aquí, el 'protect' middleware ya adjuntó req.user
    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        message: "Acceso concedido a la ruta protegida.",
    });
});

module.exports = router;