import express from 'express';
import { login, register, updateProfile, getProfile, getPublicProfile } from '../controllers/user.controller.js';
import { loginValidation, registerValidation } from '../middlewares/validation.middleware.js';
import { catchAsync } from '../middlewares/error.middleware.js';
import authenticate from "../middlewares/authenticate.middleware.js";

const router = express.Router();

// #region registerUser
router.get('/me', authenticate, catchAsync(getProfile));
router.put('/update-profile', authenticate, catchAsync(updateProfile));
router.post('/register', registerValidation, catchAsync(register));
router.post('/login', loginValidation, catchAsync(login));
router.get('/profile/:id', catchAsync(getPublicProfile));

export default router;