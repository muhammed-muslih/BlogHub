import express from "express";
import * as blogController from "../controllers/blog.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/", userAuth, blogController.createBlog);
router.get("/", userAuth, blogController.fetchAllBlogs);
router.get("/:id", userAuth, blogController.fetchBlogById);
router.put("/:id", userAuth, blogController.updateBlog);
router.delete("/:id", userAuth, blogController.deleteBlog);

export default router;
