import { Router } from "express";

const router = Router();
import PostRoutes from "../routes/post.routes.js";
import UserRoutes from "../routes/user.routes.js";

router.use("/posts", PostRoutes);
router.use("/users", UserRoutes);

export default router;
