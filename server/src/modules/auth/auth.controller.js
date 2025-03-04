import { Router } from "express";
import * as authService from "./auth.service.js"
import * as authValidation from "./auth.validation.js"
import { asyncHandler } from "../../utils/index.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { isValid } from "../../middlewares/validation.middleware.js";

const router = Router();

// register
router.post("/signup", isValid(authValidation.signup), asyncHandler(authService.signup));

// login
router.post("/login", isValid(authValidation.login), asyncHandler(authService.login));

// logout
router.put("/logout", isAuthenticated, asyncHandler(authService.logout));

export default router;