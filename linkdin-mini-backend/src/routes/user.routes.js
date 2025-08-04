import { Router } from "express";

import * as userController from "../controllers/user.controller.js";
import * as validator from "../validators/auth.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validator.register, userController.register);

router.post("/login", validator.login, userController.login);

router.get("/logout", verifyJWT, userController.logout);

router.get("/profile", verifyJWT, userController.getProfile);

router.get("/authorprofile/:userId", verifyJWT, userController.getAuthorProfile);

export default router;
