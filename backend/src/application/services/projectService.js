const projectRepository = require('../../infrastructure/repositories/projectRepository');

class ProjectService {
  async createProject(data) {
    return projectRepository.create(data);
  }

  async getAllProjects() {
    return projectRepository.findAll();
  }

  async getProjectById(id) {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new Error('Projeto não encontrado');
    }
    return project;
  }

  async updateProject(id, data) {
    const project = await projectRepository.updateById(id, data);
    if (!project) {
      throw new Error('Projeto não encontrado');
    }
    return project;
  }

  async deleteProject(id) {
    const project = await projectRepository.deleteById(id);
    if (!project) {
      throw new Error('Projeto não encontrado');
    }
    return { message: 'Projeto deletado com sucesso' };
  }
}

module.exports = new ProjectService();