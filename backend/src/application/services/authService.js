require('dotenv').config();

const jwt = require('jsonwebtoken');
const userRepository = require('../../infrastructure/repositories/userRepository');


// Certifique-se de que o dotenv carregou o JWT_SECRET
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido no arquivo .env');
}

const JWT_SECRET = process.env.JWT_SECRET;

class AuthService {
  /**
   * Autentica um usuário e retorna um token JWT.
   * @param {string} email - O email do usuário.
   * @param {string} password - A senha do usuário.
   * @returns {Promise<string>} O token JWT.
   */
  async loginUser(email, password) {
    // 1. Encontrar o usuário
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // 2. Comparar a senha
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Credenciais inválidas');
    }

    // 3. Gerar o token
    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '24h', // Token expira em 24 horas
    });

    return token;
  }
}

// Exportamos uma instância
module.exports = new AuthService();