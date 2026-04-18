import { Router } from "express";
import { getNotifications, getUnreadCount, markAsRead } from "../controllers/notification.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import { catchAsync } from "../middlewares/error.middleware.js";

const router = Router();

router.use(authenticate);

router.get('/', catchAsync(getNotifications));
router.put('/:id/read', catchAsync(markAsRead));
router.get('/unread-count', catchAsync(getUnreadCount));

export default router;