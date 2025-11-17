const resumeService = require('../../application/services/resumeService');

class ResumeController {
  async create(req, res) {
    try {
      const item = await resumeService.createItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const items = await resumeService.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const item = await resumeService.getItemById(req.params.id);
      res.status(200).json(item);
    } catch (error) {
      if (error.message === 'Item não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const item = await resumeService.updateItem(req.params.id, req.body);
      res.status(200).json(item);
    } catch (error) {
      if (error.message === 'Item não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async remove(req, res) {
    try {
      const result = await resumeService.deleteItem(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Item não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ResumeController();