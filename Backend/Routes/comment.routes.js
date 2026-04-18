import express from 'express';
import authenticate from '../middlewares/authenticate.middleware.js';
import { createComment, deleteComment, getAllComment, getCommentById, updateComment } from '../controllers/comment.controller.js';
import { createLimiter, createCommentValidation, paginationValidation, getCommentValidation } from '../middlewares/validation.middleware.js';
import { catchAsync } from '../middlewares/error.middleware.js';


const router = express.Router();

router.post('/', authenticate, createLimiter, createCommentValidation, catchAsync(createComment));
router.get('/', paginationValidation, catchAsync(getAllComment));
router.get('/:id', getCommentValidation, catchAsync(getCommentById));
router.put('/:id', authenticate, catchAsync(updateComment));
router.delete('/:id', authenticate, catchAsync(deleteComment));

export default router;