const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Asumiendo que el modelo Post está en la carpeta models
const { verifyToken } = require('../middlewares/auth');

// Ruta para manejar "me gusta" en una publicación
router.post('/:postId/like', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Llamamos al método toggleLike para alternar "me gusta"
    await post.toggleLike(req.user.id);

    res.json({ message: 'Like toggled', likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;