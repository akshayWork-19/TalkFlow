import Comment from "../models/comment.model.js";
// import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { NotFoundError, AuthenticationError, AuthorizationError, ValidationError } from "../utils/customError.js";
import { emitNotification } from "../socket.js";
import Notification from '../models/notification.model.js';


// #region createComment
const createComment = async (req, res) => {
  const { content, post, parentComment } = req.body;
  const author = req.user._id;
  if (!author) {
    throw new AuthenticationError('user not found')
  }
  if (!content) {
    throw new ValidationError('comment not found!')
  }

  const postExists = await Post.findById(post);
  if (!postExists) {
    throw new ValidationError('post not found')
  }

  // if a reply ,check for comments
  if (parentComment) {
    const parentExists = await Comment.findById(parentComment);
    if (!parentExists) {
      throw new NotFoundError('parent comment not found')
    }
  }

  // create comment
  const comment = new Comment({
    content,
    author,
    post,
    parentComment: parentComment || null
  })

  await comment.save();
  await comment.populate('author', 'username email');

  await Post.findByIdAndUpdate(post, {
    $inc: { commentsCount: 1 }
  });
  const postAuthorId = postExists.author.toString();
  if (postAuthorId !== author.toString()) {

    const notification = await Notification.create({
      recipient: postAuthorId,
      sender: author,
      type: 'comment',
      message: `${req.user.username} commented on your post: "${postExists.title}"`,
      relatedId: post
    });

    emitNotification(postAuthorId, {
      id: notification._id,
      message: notification.message,
      createdAt: new Date()
    })
  }

  return res.status(200).json({
    success: true,
    message: "Comment created Successfully!!",
    data: comment
  });
}

//#region getAllComment
const getAllComment = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // console.log(page);
  // console.log(limit);
  // console.log(skip);
  const comments = await Comment.find()
    .populate('author', 'username email')
    .populate('post', 'title')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // console.log(comments);

  const total = await Comment.countDocuments();
  console.log(total);
  res.status(200).json({
    success: true,
    data: comments,
    pagination: {
      current: page,
      pages: Math.ceil(total / limit),
      total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  });
}

// #region getSpecificComment
const getCommentById = async (req, res) => {
  const commentId = req.params.id;
  // console.log(commentId);
  if (!commentId) {
    throw new AuthorizationError('Comment Id is not found!')
  }
  const comment = await Comment.findById(commentId)
    .populate('author', 'username email')
    .populate('post', 'title');

  if (!comment) {
    throw new ValidationError('comment not found!');
  }
  res.status(200).json({
    success: true,
    message: "Comment found!",
    data: comment,
  });
}

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  const comment = await Comment.findById(id);
  if (!comment) {
    throw new NotFoundError('Comment Not Found');
  }

  if (comment.author.toString() !== userId.toString()) {
    throw new AuthenticationError('You are not authorized to edit this comment');
  }

  comment.content = content;
  await comment.save();

  return res.status(200).json({
    success: true,
    message: "Comment updated!",
    data: comment,
  })

};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const userRole = req.user.role;

  const comment = await Comment.findById(id);
  if (!comment) {
    throw new NotFoundError('Comment not found!');
  }
  if (comment.author.toString() !== userId.toStirng() && userRole !== 'admin') {
    throw new AuthenticationError('Not Authorized to delete this comment!');
  }

  await Comment.findByIdAndDelete(id);

  await Post.findByIdAndUpdate(comment.post, { $inc: { commentsCount: -1 } });

  return res.status(200).json({
    success: true,
    message: "Comment Deleted!"
  });
};

export {
  createComment,
  getAllComment,
  getCommentById,
  updateComment,
  deleteComment
}