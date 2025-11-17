const ResumeItem = require('../../domain/models/ResumeItem');

class ResumeRepository {
  async create(data) {
    const item = new ResumeItem(data);
    return item.save();
  }

  async findAll() {
    // Ordena por data de início (descrescente) ou criação
    return ResumeItem.find().sort({ startDate: -1 });
  }

  async findById(id) {
    return ResumeItem.findById(id);
  }

  async updateById(id, data) {
    return ResumeItem.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return ResumeItem.findByIdAndDelete(id);
  }
}

module.exports = new ResumeRepository();