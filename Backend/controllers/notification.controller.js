import Notification from "../models/notification.model.js";

export const getUnreadCount = async (req, res) => {
    const count = await Notification.countDocuments({
        recipient: req.user._id,
        isRead: false
    });
    return res.status(200).json({
        success: true,
        count
    })
}

export const getNotifications = async (req, res) => {
    const notifications = await Notification.find({ recipient: req.user._id })
        .populate('sender', 'username avatar')
        .sort({ createdAt: -1 })
        .limit(50);

    return res.status(200).json({
        success: true,
        notifications
    })
}

export const markAsRead = async (req, res) => {
    const { id } = req.params;
    await Notification.findOneAndUpdate({
        _id: id,
        recipient: req.user._id
    },
        { isRead: true });
    return res.status(200).json({
        success: true,
        message: "Marked as read"
    });
};


