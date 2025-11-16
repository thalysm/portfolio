const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define o local de armazenamento
const uploadDir = path.join(__dirname, '../../uploads');

// Cria o diretório 'uploads' se ele não existir
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Garante um nome de arquivo único (timestamp + nome original)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Filtro de arquivo (opcional, mas recomendado)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não suportado! Apenas imagens são permitidas.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limite de 5MB
});

module.exports = upload;