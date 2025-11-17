const resumeRepository = require('../../infrastructure/repositories/resumeRepository');

class ResumeService {
  async createItem(data) {
    return resumeRepository.create(data);
  }

  async getAllItems() {
    return resumeRepository.findAll();
  }

  async getItemById(id) {
    const item = await resumeRepository.findById(id);
    if (!item) throw new Error('Item não encontrado');
    return item;
  }

  async updateItem(id, data) {
    const item = await resumeRepository.updateById(id, data);
    if (!item) throw new Error('Item não encontrado');
    return item;
  }

  async deleteItem(id) {
    const item = await resumeRepository.deleteById(id);
    if (!item) throw new Error('Item não encontrado');
    return { message: 'Item deletado com sucesso' };
  }
}

module.exports = new ResumeService();