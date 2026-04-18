import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, AuthorizationError } from "../utils/customError.js";
import redisClient from "../config/redis.config.js";

const generateWebToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '5d' }
  );
}

// #region reg.Controller
console.log("akshay");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    throw new AuthorizationError(' username,email,password,role');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AuthenticationError('user already exists');
  }

  //if not then hash the password first
  const hashedPassword = await bcrypt.hash(password, 10);

  //create new user with hashed password
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role
  });

  await newUser.save();
  const userToken = generateWebToken(newUser._id);

  return res.status(201).json({
    success: true,
    message: "User is registered succesfully!",
    userToken,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      password: newUser.password,
    }
  });
}

//#endregion

//#region loginController

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AuthorizationError('email,passwords are required!');
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new AuthorizationError("user doesn't exist or invalid email");
  }

  const matchPasswords = await bcrypt.compare(password, existingUser.password);
  if (!matchPasswords) {
    throw new AuthenticationError('Invalid credentials');
  }

  const token = generateWebToken(existingUser._id);
  return res.status(201).json({
    success: true,
    message: "User logged in successfully!",
    token,
    user: {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    }
  });
}


const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  return res.status(200).json({
    success: true,
    user
  });
};

const updateProfile = async (req, res) => {
  const { aboutMe, avatar } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, {
    aboutMe,
    avatar
  },
    {
      new: true,
      runValidators: true
    }
  ).select('-password');

  return res.status(200).json({
    success: true,
    message: "Profile updated!",
    user
  });
}

const getPublicProfile = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `profile:${id}`;

  const cachedUser = await redisClient.get(cacheKey);
  if (cachedUser) {
    return res.status(200).json({
      success: true,
      user: JSON.parse(cachedUser)
    });
  }


  const user = await User.findById(id).select('username reputation aboutMe avatar createdAt');
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  await redisClient.setEx(cacheKey, 1800, JSON.stringify(user));

  return res.status(200).json({
    success: true,
    user
  });
}


export {
  register,
  login,
  getProfile,
  getPublicProfile,
  updateProfile
};
