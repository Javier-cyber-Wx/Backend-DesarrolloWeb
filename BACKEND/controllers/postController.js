const Post = require('../models/Post');

// Crear una publicación
const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.create({
      title,
      content,
      author: req.user.id, // Se asume que el usuario está autenticado
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las publicaciones
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username' }
      });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener las publicaciones más populares (con más likes)
const getTrendingPosts = async (req, res) => {
  try {
    // Ordenamos por la longitud del array `likes` y limitamos los resultados a 5 publicaciones
    const trendingPosts = await Post.find()
      .sort({ 'likes.length': -1 }) // Ordena por el número de likes (longitud del array)
      .limit(5) // Solo los 5 posts más populares
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username' }
      });
    
    res.json(trendingPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una publicación
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post || post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una publicación
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne(); // Cambia post.remove() a post.deleteOne()
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPosts, getTrendingPosts, updatePost, deletePost };
