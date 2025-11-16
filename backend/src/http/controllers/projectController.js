const projectService = require('../../application/services/projectService');

class ProjectController {

  // POST /projects
  async create(req, res) {
    try {
      const project = await projectService.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // GET /projects
  async getAll(req, res) {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // GET /projects/:id
  async getById(req, res) {
    try {
      const project = await projectService.getProjectById(req.params.id);
      res.status(200).json(project);
    } catch (error) {
      if (error.message === 'Projeto não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  // PUT /projects/:id
  async update(req, res) {
    try {
      const project = await projectService.updateProject(req.params.id, req.body);
      res.status(200).json(project);
    } catch (error) {
      if (error.message === 'Projeto não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  // DELETE /projects/:id
  async remove(req, res) {
    try {
      const result = await projectService.deleteProject(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Projeto não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProjectController();