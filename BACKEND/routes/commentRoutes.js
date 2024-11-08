// routes/commentRoutes.js
const express = require('express');
const { addComment, getComments } = require('../controllers/commentController'); // Asegúrate de que esto apunte al controlador correcto
const authMiddleware = require('../middlewares/authMiddleware'); // Asegúrate de que esto esté correcto

const router = express.Router();

// Rutas
router.post('/', authMiddleware, addComment); // Verifica que addComment esté definido
router.get('/:postId', getComments); // Verifica que getComments esté definido

module.exports = router;
