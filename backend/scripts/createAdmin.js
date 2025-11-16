const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../src/domain/models/User'); // Ajuste o caminho se necessário

// Carrega as variáveis de ambiente (apontando para o .env na raiz do backend)
dotenv.config({ path: __dirname + '/../.env' });

// --- CONFIGURE SEU ADMIN AQUI ---
const ADMIN_EMAIL = 'thalyscorreia@hotmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Mude esta senha!
// ---------------------------------

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Erro: MONGODB_URI não está definido no arquivo .env');
  process.exit(1);
}

if (ADMIN_EMAIL === 'seu-email@admin.com' || ADMIN_PASSWORD === 'SuaSenhaSuperForte123') {
  console.warn('AVISO: Por favor, edite o script createAdmin.js e mude o email e senha padrão.');
  process.exit(0);
}

const createAdmin = async () => {
  try {
    // 1. Conectar ao DB
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado ao MongoDB...');

    // 2. Verificar se o admin já existe
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log(`Admin com email "${ADMIN_EMAIL}" já existe.`);
      await mongoose.disconnect();
      return;
    }

    // 3. Criar o novo admin
    // O hook 'pre-save' no User.js cuidará do hash da senha
    const admin = new User({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    await admin.save();
    console.log(`Admin "${ADMIN_EMAIL}" criado com sucesso!`);

    // 4. Desconectar
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB.');

  } catch (error) {
    console.error('Erro ao criar admin:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createAdmin();