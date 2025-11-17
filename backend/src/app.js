const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./http/routes/authRoutes');
const projectRoutes = require('./http/routes/projectRoutes');
const uploadRoutes = require('./http/routes/uploadRoutes');
const postRoutes = require('./http/routes/postRoutes');
const contactRoutes = require('./http/routes/contactRoutes');
const categoryRoutes = require('./http/routes/categoryRoutes');
const resumeRoutes = require('./http/routes/resumeRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
  res.send('API do Portfólio está funcionando!');
});

app.use('/api', authRoutes);
app.use('/api', projectRoutes);
app.use('/api', uploadRoutes);
app.use('/api', postRoutes);
app.use('/api', contactRoutes);
app.use('/api', categoryRoutes);
app.use('/api', resumeRoutes);

module.exports = app;