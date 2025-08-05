import asyncHandler from "express-async-handler";
import * as userServices from "../services/user.js";
import AppError from "../utils/appError.js";
import * as blogServices from "../services/blog.js";

//get current user’s profile
//@route POST /api/user/me
const getCurrentUser = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user;
  const user = await userServices.findUserById(userId);

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  res.status(200).json({
    status: "success",
    user: {
      id: user.id,
      userName: user.userName,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
});

//get user blogs
//@route GET /api/user/blogs
const fetchUserBlogs = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user;

  const blogs = await blogServices.fetchUserBlogs(userId);

  res.status(200).json({
    status: "success",
    count: blogs.length,
    data: blogs ?? [],
  });
});

export { getCurrentUser, fetchUserBlogs };
