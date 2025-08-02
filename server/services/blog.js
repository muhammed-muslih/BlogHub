import Blog from "../models/blog.js";

const createBlog = async (blogData) => await Blog.create(blogData);

const fetchAllBlogs = async () =>
  await Blog.find().populate("author", "userName email");

const fetchBlogById = async (id) =>
  await Blog.findById(id).populate("author", "userName email");

const updateBlogById = async (id, blogData) =>
  await Blog.findByIdAndUpdate(id, blogData, { new: true });

const deleteBlogById = async (id) => await Blog.findByIdAndDelete(id);

export {
  createBlog,
  fetchAllBlogs,
  fetchBlogById,
  updateBlogById,
  deleteBlogById,
};
