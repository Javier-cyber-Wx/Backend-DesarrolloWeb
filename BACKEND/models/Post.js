const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Almacena los usuarios que han dado "me gusta"
  }],
}, { timestamps: true });

// Método para manejar "me gusta"
postSchema.methods.toggleLike = async function(userId) {
  const index = this.likes.indexOf(userId);

  if (index === -1) {
    // Si el usuario no ha dado "me gusta", lo añadimos
    this.likes.push(userId);
  } else {
    // Si el usuario ya ha dado "me gusta", lo eliminamos
    this.likes.splice(index, 1);
  }

  return this.save(); // Guardamos los cambios en la base de datos
};

module.exports = mongoose.model('Post', postSchema);
