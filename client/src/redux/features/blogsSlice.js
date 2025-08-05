import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogs, fetchUserBlogs } from "../../api/blog";
const initialState = {
  items: [],
  totalBlogs: null,
  selectedBlogId: null,
  loading: false,
  error: null,
  userBlogs: [],
  userTotalBlogs: null,
  userBlogsLoading: false,
  userBlogsError: null,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setSelectedBlogId(state, action) {
      state.selectedBlogId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.data ?? [];
        state.totalBlogs = action.payload?.count ?? 0;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchUserBlogs.pending, (state) => {
        state.userBlogsLoading = true;
        state.userBlogsError = null;
      })
      .addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.userBlogsLoading = false;
        state.userBlogs = action.payload?.data ?? [];
        state.userTotalBlogs = action.payload?.count ?? 0;
      })
      .addCase(fetchUserBlogs.rejected, (state, action) => {
        state.userBlogsLoading = false;
        state.userBlogsError = action.error.message;
      });
  },
});
export const { setSelectedBlogId } = blogsSlice.actions;
export const selectBlogs = (state) => state.blogs.items;
export const selectTotalBlogs = (state) => state.blogs.totalBlogs;
export const selectedBlogId = (state) => state.blogs.selectedBlogId;
export const selectUserBlogs = (state) => state.blogs.userBlogs;
export const selectUserTotalBlogs = (state) => state.blogs.userTotalBlogs;
export default blogsSlice.reducer;
