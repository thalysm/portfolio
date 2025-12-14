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
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Credenciais inválidas');
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return { token, refreshToken };
  }

  /**
   * Gera um novo access token a partir de um refresh token válido
   * @param {string} refreshToken 
   */
  async refreshAccessToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET);
      const user = await userRepository.findById(decoded.id);

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const payload = {
        id: user._id,
        email: user.email,
      };

      const newToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '15m',
      });

      return newToken;
    } catch (error) {
      throw new Error('Refresh token inválido ou expirado');
    }
  }
}

// Exportamos uma instância
module.exports = new AuthService();