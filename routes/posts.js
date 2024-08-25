const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to protect routes

// Create a new post
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { subject, description, tags } = req.body;
    const newPost = new Post({
      user: req.user.id, // Access the logged-in user's ID from authMiddleware
      subject,
      description,
      tags,
    });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts (for the homepage)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to find posts by tags
router.post('/by-tags', async (req, res) => {
    try {
      const { tags } = req.body;
  
      // Ensure tags is an array
      if (!Array.isArray(tags)) {
        return res.status(400).json({ message: 'Tags must be an array' });
      }
      console.log('Received tags:', tags);
      // Find posts with any of the specified tags
      const posts = await Post.find({ tags: { $in: tags } });
  
      // Send response
      res.json(posts);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/:postId/comments', authMiddleware, async (req, res) => {
    try {
      const { text } = req.body;
      const { postId } = req.params;
  
      // Find the post
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Create the comment
      const comment = new Comment({
        user: req.user.id,
        post: postId,
        text,
      });
  
      // Save the comment
      await comment.save();
  
      // Add the comment to the post
      post.comments.push(comment._id);
      await post.save();
  
      res.status(201).json(comment);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  // Like a post
router.post('/:postId/like', authMiddleware, async (req, res) => {
    try {
      const { postId } = req.params;
  
      // Find the post
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Increment the like count
      post.likes += 1;
      await post.save();
  
      res.status(200).json({ message: 'Post liked', likes: post.likes });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

// Get a single post with optional comments
router.get('/:postId', async (req, res) => {
    try {
      const { postId } = req.params;
  
      // Find the post and populate comments and user
      const post = await Post.findById(postId)
        .populate('comments')
        .populate('user', 'username'); // Populate the user who posted
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;