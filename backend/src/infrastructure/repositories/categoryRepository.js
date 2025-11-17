const Category = require('../../domain/models/Category');

class CategoryRepository {
  async create(data) {
    const category = new Category(data);
    return category.save();
  }

  async findAll() {
    return Category.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return Category.findById(id);
  }

  async updateById(id, data) {
    return Category.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return Category.findByIdAndDelete(id);
  }
}

module.exports = new CategoryRepository();