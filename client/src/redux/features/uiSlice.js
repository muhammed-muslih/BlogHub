import { createSlice } from "@reduxjs/toolkit";

const isDesktop = window.innerWidth >= 768; // md breakpoint
const initialState = {
  activeSidebarItem: "",
  isSidebarOpen: isDesktop, 
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSidebarItem(state, action) {
      state.activeSidebarItem = action.payload;
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen(state, action) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setActiveSidebarItem, toggleSidebar, setSidebarOpen } =
  uiSlice.actions;
export const selectActiveSidebarItem = (state) => state.ui.activeSidebarItem;
export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;

export default uiSlice.reducer;
