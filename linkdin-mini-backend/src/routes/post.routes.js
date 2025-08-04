import { Router } from "express";
import * as postValidator from "../validators/post.js";
import * as postController from "../controllers/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  verifyJWT,
  postValidator.create,
  postController.create
);

router.get("/all", verifyJWT, postController.getAll);

router.get("/:id", verifyJWT, postController.getById);

export default router;
