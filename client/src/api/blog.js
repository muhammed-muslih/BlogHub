import apiInstance from "./axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBlogs = createAsyncThunk("blogs/fetchAll", async () => {
  const response = await apiInstance.get("/blogs");
  return response.data;
});

export const fetchSingleBlog = createAsyncThunk(
  "singleBlog/fetchById",
  async (id) => {
    const response = await apiInstance.get(`/blogs/${id}`);
    return response.data;
  }
);
export const createNewBlog = async (payload) => {
  const response = await apiInstance.post("/blogs", payload);
  return response;
};

export const updateBlog = async (id, payload) => {
  const response = await apiInstance.put(`/blogs/${id}`, payload);
  return response;
};

export const deleteBlog = async (id) => {
  const response = await apiInstance.delete(`/blogs/${id}`);
  return response;
};

export const fetchUserBlogs = createAsyncThunk(
  "blogs/fetchUserBlogs",
  async () => {
    const response = await apiInstance.get("/user/blogs");
    return response.data;
  }
);
