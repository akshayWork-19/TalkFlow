import { Router } from "express";
import { getAllTags, getPostsByTag } from "../controllers/tag.controller.js";
import { catchAsync } from "../middlewares/error.middleware.js";

const router = Router();

router.get('/', catchAsync(getAllTags));
router.get('/:slug', catchAsync(getPostsByTag));

export default router;