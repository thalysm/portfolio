const messageService = require('../../application/services/messageService');

class MessageController {

  // POST /contact (Público)
  async create(req, res) {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Nome, email e mensagem são obrigatórios.' });
    }

    try {
      const savedMessage = await messageService.saveMessage({ name, email, message });
      res.status(201).json(savedMessage);
    } catch (error) {
      // Log de erro interno
      console.error(error);
      res.status(500).json({ message: 'Erro ao salvar a mensagem.' });
    }
  }

  // GET /messages (Protegido)
  async getAll(req, res) {
    try {
      const messages = await messageService.getAllMessages();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // DELETE /messages/:id (Protegido)
  async remove(req, res) {
    try {
      const result = await messageService.deleteMessage(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Mensagem não encontrada') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new MessageController();