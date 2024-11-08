const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/Like'); // Asegúrate de importar las rutas de "me gusta"
const { errorHandler } = require('./middlewares/errorMiddleware');

const cors = require('cors');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI; 
connectDB(mongoURI);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/posts', likeRoutes); // Ruta añadida para "me gusta"

// Middleware para manejar errores
app.use(errorHandler);

// Configuración del puerto
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
