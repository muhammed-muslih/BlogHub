import apiInstance from "./axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await apiInstance.get("/user/me");
  return response.data;
});
