import express from "express";
import * as userController from "../controllers/user.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.get("/me", userAuth, userController.getCurrentUser);
router.get("/blogs", userAuth, userController.fetchUserBlogs);

export default router;
