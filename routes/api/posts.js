const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const {
  getUserPosts,
  createUserPost,
  getaUserPost,
  deleteUserPosts,
  likeUserPost,
  unlikeUserPost,
  deleteUserComment,
  createUserComment
} = require('../../controller/postsController');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  ['/', auth, check('text', 'Text is required').notEmpty()],

  createUserPost
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, getUserPosts);

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), getaUserPost);

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], deleteUserPosts);

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, checkObjectId('id'), likeUserPost);

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, checkObjectId('id'), unlikeUserPost);

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  [
    '/comment/:id',
    auth,
    checkObjectId('id'),
    check('text', 'Text is required').notEmpty()
  ],
  createUserComment
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, deleteUserComment);

module.exports = router;
