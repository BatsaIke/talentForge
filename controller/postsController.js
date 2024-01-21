const { validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const e = require("express");

//@rout GET api/posts
//@desc get all post
//access private
const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//@rout Post api/posts
//@desc create a user post
//access private
const createUserPost = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save();

      res.json(post);
  } catch (error) {
    console.error(error.message);
res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

//@rout GET api/posts/:post_id
//@desc get a post by id
//access private
const getaUserPost = async (req, res) => {
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      res.json(post);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }}
};

//@rout DELETE api/posts/:post_id
//@desc delete a post
//access private
const deleteUserPosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);
res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
const likeUserPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (error) {
    console.error(error);
res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
const unlikeUserPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (error) {
    console.error(error);
res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
const createUserComment = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

//@rout Post api/delete:id/coment_id
//@desc delete a user comment
//access private
const deleteUserComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );
    await post.save();

    return res.json(post.comments);
  } catch (error) {
    console.error(error);
    return res.json({ msg: 'Comment deleted', comments: post.comments });
  }
};

module.exports = {
  getUserPosts,
  createUserPost,
  getaUserPost,
  deleteUserPosts,
  likeUserPost,
  createUserComment,
  deleteUserComment,
  unlikeUserPost,
};
