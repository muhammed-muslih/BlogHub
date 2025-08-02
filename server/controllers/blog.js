import * as blogServices from "../services/blog.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import mongoose from "mongoose";

//create new blog post
//@route POST /api/blogs
const createBlog = asyncHandler(async (req, res, next) => {
  let { title, content, quote } = req.body;
  const { id: userId } = req.user;

  if (!title || !content) {
    throw new AppError("Title and content are required.", 400);
  }

  const blog = await blogServices.createBlog({
    title,
    content,
    quote: quote || "",
    author: userId,
  });

  res.status(201).json({
    status: "success",
    message: "New blog created successfully",
    data: blog,
  });
});

//fetch all blogs post
//@route GET /api/blogs
const fetchAllBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await blogServices.fetchAllBlogs();

  res.status(200).json({
    status: "success",
    count: blogs.length,
    data: blogs,
  });
});

//fetch blog post by ID
//@route GET /api/blogs/:id
const fetchBlogById = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    throw new AppError("Invalid blog ID format.", 400);
  }

  const blog = await blogServices.fetchBlogById(blogId);

  if (!blog) {
    throw new AppError("Blog not found.", 404);
  }

  res.status(200).json({
    status: "success",
    data: blog,
  });
});

//update blog post
//@route PUT /api/blogs/:id
const updateBlog = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user;
  let { title, content, quote } = req.body;
  const blogId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    throw new AppError("Invalid blog ID format.", 400);
  }

  const isBlogExist = await blogServices.fetchBlogById(blogId);

  if (!isBlogExist) {
    throw new AppError("Blog not found.", 404);
  }

  if (isBlogExist.author._id.toString() !== userId) {
    throw new AppError("You are not authorized to update this blog.", 403);
  }

  const updatedBlog = await blogServices.updateBlogById(blogId, {
    title,
    content,
    quote: quote || "",
  });

  res.status(200).json({
    status: "success",
    message: "Blog updated successfully",
    data: updatedBlog,
  });
});

//delete blog post
//@route DELETE /api/blogs/:id
const deleteBlog = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user;
  const blogId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    throw new AppError("Invalid blog ID format.", 400);
  }

  const blog = await blogServices.fetchBlogById(blogId);
  if (!blog) {
    throw new AppError("Blog not found.", 404);
  }

  if (blog.author._id.toString() !== userId) {
    throw new AppError("You are not authorized to delete this blog.", 403);
  }

  await blogServices.deleteBlogById(blogId);

  res.status(200).json({
    status: "success",
    message: "Blog deleted successfully",
  });
});

export { createBlog, fetchBlogById, fetchAllBlogs, updateBlog, deleteBlog };
