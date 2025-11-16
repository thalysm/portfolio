const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente
dotenv.config();

// Importar rotas
const authRoutes = require('./http/routes/authRoutes');
const projectRoutes = require('./http/routes/projectRoutes');
const uploadRoutes = require('./http/routes/uploadRoutes');
const postRoutes = require('./http/routes/postRoutes');
const contactRoutes = require('./http/routes/contactRoutes');

const app = express();

// Middlewares essenciais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (para uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Portfólio está funcionando!');
});

// Usar as rotas da API (prefixo /api)
app.use('/api', authRoutes);
app.use('/api', projectRoutes);
app.use('/api', uploadRoutes);
app.use('/api', postRoutes);
app.use('/api', contactRoutes);

module.exports = app;