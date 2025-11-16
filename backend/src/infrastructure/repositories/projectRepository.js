const Project = require('../../domain/models/Project');

class ProjectRepository {
  async create(projectData) {
    const project = new Project(projectData);
    return project.save();
  }

  async findAll() {
    // Ordena pelos mais recentes primeiro
    return Project.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return Project.findById(id);
  }

  async updateById(id, updateData) {
    return Project.findByIdAndUpdate(id, updateData, { new: true }); // {new: true} retorna o documento atualizado
  }

  async deleteById(id) {
    return Project.findByIdAndDelete(id);
  }
}

module.exports = new ProjectRepository();