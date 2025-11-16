const postRepository = require('../../infrastructure/repositories/postRepository');

class PostService {
  async createPost(data) {
    return postRepository.create(data);
  }

  async getAllPosts(limit) {
    return postRepository.findAll(limit);
  }

  async getPostById(id) {
    const post = await postRepository.findById(id);
    if (!post) {
      throw new Error('Post não encontrado');
    }
    return post;
  }

  async updatePost(id, data) {
    const post = await postRepository.updateById(id, data);
    if (!post) {
      throw new Error('Post não encontrado');
    }
    return post;
  }

  async deletePost(id) {
    const post = await postRepository.deleteById(id);
    if (!post) {
      throw new Error('Post não encontrado');
    }
    return { message: 'Post deletado com sucesso' };
  }
}

module.exports = new PostService();