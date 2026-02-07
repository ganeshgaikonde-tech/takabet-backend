const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getAllPostsAdmin
} = require('../controllers/postController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getPosts);
router.get('/:slug', getPostBySlug);

// Admin routes
router.get('/admin/all', protect, admin, getAllPostsAdmin);
router.post('/', protect, admin, createPost);
router.put('/:id', protect, admin, updatePost);
router.delete('/:id', protect, admin, deletePost);

module.exports = router;
