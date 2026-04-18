import { Router } from "express";
import { followUser, unfollowUser } from "../controllers/follow.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js"

const router = Router();

router.use(authenticate);

router.post('/follow/:userid', followUser);
router.post('/unfollow/:userid', unfollowUser);


export default router;
