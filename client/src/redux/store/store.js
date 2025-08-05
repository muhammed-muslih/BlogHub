import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import uiReducer from "../features/uiSlice";
import blogsReducer from "../features/blogsSlice";
import singleBlogReducer from "../features/singleBlogSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const singleBlogPersistConfig = {
  key: "singleBlog",
  storage,
};

const persistedSingleBlogReducer = persistReducer(
  singleBlogPersistConfig,
  singleBlogReducer
);

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  blogs: blogsReducer,
  singleBlog: persistedSingleBlogReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
