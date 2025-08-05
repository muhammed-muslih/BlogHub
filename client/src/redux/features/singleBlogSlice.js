import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleBlog } from "../../api/blog";

const initialState = {
  item: null,
  loading: false,
  error: null,
};
const singleBlogSlice = createSlice({
  name: "singleBlog",
  initialState,
  reducers: {
    clearSingleBlog: (state) => {
      state.item = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload?.data;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSingleBlog } = singleBlogSlice.actions;
export const selectedBlog = (state) => state.singleBlog.item;
export default singleBlogSlice.reducer;
