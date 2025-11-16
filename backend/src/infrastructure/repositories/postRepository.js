const Post = require('../../domain/models/Post');

class PostRepository {
  async create(postData) {
    const post = new Post(postData);
    return post.save();
  }

  async findAll(limit = null) {
    let query = Post.find().sort({ createdAt: -1 });
    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }
    return query;
  }

  async findById(id) {
    return Post.findById(id);
  }

  async updateById(id, updateData) {
    return Post.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id) {
    return Post.findByIdAndDelete(id);
  }
}

module.exports = new PostRepository();