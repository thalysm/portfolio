const postService = require('../../application/services/postService');

class PostController {

  // POST /posts
  async create(req, res) {
    try {
      const post = await postService.createPost(req.body);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // GET /posts
  async getAll(req, res) {
    try {
      // Verifica se há um query param 'limit' (ex: /api/posts?limit=3)
      const { limit } = req.query;
      const posts = await postService.getAllPosts(limit);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // GET /posts/:id
  async getById(req, res) {
    try {
      const post = await postService.getPostById(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      if (error.message === 'Post não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  // PUT /posts/:id
  async update(req, res) {
    try {
      const post = await postService.updatePost(req.params.id, req.body);
      res.status(200).json(post);
    } catch (error) {
      if (error.message === 'Post não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  // DELETE /posts/:id
  async remove(req, res) {
    try {
      const result = await postService.deletePost(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Post não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PostController();