const Message = require('../../domain/models/Message');

class MessageRepository {
  async create(messageData) {
    const message = new Message(messageData);
    return message.save();
  }

  async findAll() {
    // Lista as mais recentes primeiro
    return Message.find().sort({ createdAt: -1 });
  }
  
  // (Embora não tenhamos um 'update', vou adicionar 'findById' caso queira implementar 'marcar como lido' no futuro)
  async findById(id) {
    return Message.findById(id);
  }

  async deleteById(id) {
    return Message.findByIdAndDelete(id);
  }

  // (Exemplo de como seria o 'marcar como lido')
  // async updateAsRead(id) {
  //   return Message.findByIdAndUpdate(id, { read: true }, { new: true });
  // }
}

module.exports = new MessageRepository();