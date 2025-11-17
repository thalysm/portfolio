const categoryService = require('../../application/services/categoryService');

class CategoryController {
  async create(req, res) {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      if (error.message === 'Categoria não encontrada') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const category = await categoryService.updateCategory(req.params.id, req.body);
      res.status(200).json(category);
    } catch (error) {
      if (error.message === 'Categoria não encontrada') {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async remove(req, res) {
    try {
      const result = await categoryService.deleteCategory(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Categoria não encontrada') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CategoryController();