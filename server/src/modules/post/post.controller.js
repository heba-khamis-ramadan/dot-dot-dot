import { Router } from "express";
import * as postService from "./post.service.js"
import * as postValidation from "./post.validation.js"
import { asyncHandler } from "../../utils/index.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { isValid } from "../../middlewares/validation.middleware.js";

const router = Router();

// create post
router.post("/", isAuthenticated, isValid(postValidation.create_post), asyncHandler(postService.create_post));
// update post
router.put("/:id", isAuthenticated, isValid(postValidation.update_post), asyncHandler(postService.update_post));
// delete post
router.delete("/:id", isAuthenticated, isValid(postValidation.delete_post), asyncHandler(postService.delete_post));
// get posts
router.get("/", isAuthenticated, asyncHandler(postService.get_posts));
// search post by title
router.get("/search-title", isAuthenticated, asyncHandler(postService.get_post_title));
// search post by content
router.get("/search-content", isAuthenticated, asyncHandler(postService.get_post_content));

export default router;