const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/auth');
const Post = require('../models/Post');

// @Route GET api/posts
// @desc Create Post
// @access Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const post = await Post.find({ user: req.userId }).populate('user', ['username']);

    res.json({ success: true, post: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

});

// @Route POST api/posts
// @desc Create Post
// @access Private
router.post('/', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(400)
      .json({
        success: false,
        message: 'Title is Required'
      });

  try {
    const newPost = new Post({
      title,
      description,
      url: (url.startsWith('https://') ? url : `https://${url}`),
      status: status || 'To Learn',
      user: req.userId,
    });

    await newPost.save();
    return res.json({
      success: true,
      message: 'Happy learning!',
      post: newPost
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal Server Error!' });
  }
});

// @Route PUT api/posts/:id
// @desc Update Post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: 'Title is require' });

  let updatePost = {
    title,
    description: description || '',
    url: (url.startsWith('https://') ? url : `https://${url}`) || '',
    status: status || 'To Learn',
  }

  const postUpdateCondition = {
    _id: req.params.id,
    user: req.userId,
  };

  updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true });

  if (!updatePost) {
    return res
      .status(404)
      .json({ success: false, message: 'Post not found or user not authorised' });
  }

  res.status(200).json({ success: true, message: 'Excellent progress!', post: updatePost });
});


// @Route DELETE api/posts/:id
// @desc Delete Post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
  const postDeleteCondition = { _id: req.params.id, user: req.userId };
  const deletedPost = await Post.findByIdAndDelete(postDeleteCondition);

  // User not authorised or post not found
  if (!deletedPost)
    return res
      .status(404)
      .json({ success: false, message: 'User not authorised or post not found' });
  res.json({ success: true, message: 'Delete post successfullly', deletePost: deletedPost });
});

module.exports = router;