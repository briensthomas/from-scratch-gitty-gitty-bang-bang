const { Router } = require('express');
const authenticate = require('../middleware/authenticate');


module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const allPosts = await Post.getAll();
    } catch(err) {
      next(err);
    }
  });
