import Follow from "../models/follow.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { ValidationError, AuthorizationError } from "../utils/customError.js";
import { emitNotification } from "../socket.js";

async function updateUserReputation(userId, points) {
    await User.findByIdAndUpdate(userId, {
        $inc: {
            reputation: points
        }
    });
}

export const followUser = async (req, res) => {
    const followerId = req.user._id;
    const followingId = req.params.userId;

    if (followerId.toString() === followingId) {
        throw new ValidationError("You cannot follow yourself");
    }

    const existingFollow = await Follow.findOne({
        follower: followerId,
        following: followingId
    });

    if (existingFollow) {
        throw new ValidationError("You are already following this user.");
    }

    await Follow.create({
        follower: followerId,
        following: followingId
    });

    await updateUserReputation(followingId, 10);

    const notification = await Notification.create({
        recipient: followingId,
        sender: followerId,
        type: 'follow',
        message: `${req.user.username} started following you!`
    });

    emitNotification(followingId, {
        id: notification._id,
        message: notification.message,
        type: 'follow',
        createdAt: notification.createdAt
    });

    return res.status(201).json({
        success: true,
        message: "Successfully followed user"
    });
}

export const unfollowUser = async (req, res) => {
    const followerId = req.user._id;
    const followingId = req.params.userId;
    const result = await Follow.findOneAndDelete({
        follower: followerId,
        followingId: followingId
    });

    if (!result) {
        throw new ValidationError("You are not following this User!");
    }

    await updateUserReputation(followingId, -10);
    return res.status(200).json({
        success: true,
        message: "Successfully unfollowed user"
    });
}

