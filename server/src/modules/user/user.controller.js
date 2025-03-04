import { Router } from "express";
import * as userService from "./user.service.js"
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/index.js";
import { fileValidation } from "../../utils/file upload/multer.js";
import { fileValidate } from "../../middlewares/validation.middleware.js";
import { cloudUpload } from "../../utils/file upload/multer_cloud.js";

const router = Router();

// update user name
router.patch("/", isAuthenticated, asyncHandler(userService.update_user));
// upload profile pic - cloud
router.post("/profile-pic", 
    isAuthenticated, 
    cloudUpload(fileValidation.images).single("image"), 
    fileValidate(fileValidation.images), 
    asyncHandler(userService.upload_profile_pic_cloud));
// delete profile pic - cloud
router.delete("/profile-pic", isAuthenticated, asyncHandler(userService.delete_profile_pic_cloud));
// get user data
router.get("/", isAuthenticated, asyncHandler(userService.get_user));
// get user profile by email
router.get("/by-email", isAuthenticated, asyncHandler(userService.get_user_email));
// get user profile by name
router.get("/by-name", isAuthenticated, asyncHandler(userService.get_user_name));

export default router;