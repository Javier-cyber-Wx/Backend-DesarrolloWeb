// controllers/commentController.js
const Comment = require('../models/Comment'); // Asegúrate de que el modelo esté correctamente importado

const addComment = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Usuario no autenticado' });

        const newComment = new Comment({
            post: req.body.post,  // Cambiado de `postId` a `post`
            user: req.user.id,    // Cambiado de `userId` a `user`
            content: req.body.content,
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error(error); // Para más detalles en la consola del servidor
        res.status(500).json({ message: 'Error al agregar el comentario', error: error.message });
    }
};


// Función para obtener comentarios
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios' });
    }
};

module.exports = { addComment, getComments };
