const categoryRepository = require('../../infrastructure/repositories/categoryRepository');

class CategoryService {
  async createCategory(data) {
    return categoryRepository.create(data);
  }

  async getAllCategories() {
    return categoryRepository.findAll();
  }

  async getCategoryById(id) {
    const category = await categoryRepository.findById(id);
    if (!category) throw new Error('Categoria não encontrada');
    return category;
  }

  async updateCategory(id, data) {
    const category = await categoryRepository.updateById(id, data);
    if (!category) throw new Error('Categoria não encontrada');
    return category;
  }

  async deleteCategory(id) {
    const category = await categoryRepository.deleteById(id);
    if (!category) throw new Error('Categoria não encontrada');
    return { message: 'Categoria deletada com sucesso' };
  }
}

module.exports = new CategoryService();