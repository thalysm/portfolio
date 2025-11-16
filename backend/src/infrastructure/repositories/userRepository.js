const User = require('../../domain/models/User');

class UserRepository {
  /**
   * Encontra um usuário pelo email.
   * @param {string} email - O email do usuário.
   * @returns {Promise<User|null>} O documento do usuário ou null.
   */
  async findByEmail(email) {
    return User.findOne({ email });
  }

  // Poderíamos adicionar create, update, delete aqui se precisássemos
  // Para o login, findByEmail é o suficiente.
}

// Exportamos uma instância para ser usada como singleton
module.exports = new UserRepository();