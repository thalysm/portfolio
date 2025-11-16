const messageRepository = require('../../infrastructure/repositories/messageRepository');

class MessageService {
  /**
   * Salva uma nova mensagem de contato.
   */
  async saveMessage(data) {
    // Poderíamos adicionar validações extras aqui (ex: anti-spam)
    return messageRepository.create(data);
  }

  /**
   * Lista todas as mensagens (para o admin).
   */
  async getAllMessages() {
    return messageRepository.findAll();
  }

  /**
   * Deleta uma mensagem (para o admin).
   */
  async deleteMessage(id) {
    const message = await messageRepository.deleteById(id);
    if (!message) {
      throw new Error('Mensagem não encontrada');
    }
    return { message: 'Mensagem deletada com sucesso' };
  }
}

module.exports = new MessageService();