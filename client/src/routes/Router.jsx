import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Auth from "../pages/Auth";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AuthProvider from "./AuthProvider";
import PublicOnlyRoute from "./PublicOnlyRoute";
import Profile from "../components/Profile/Profile";
import BlogList from "../pages/BlogList";
import SingleBlog from "../pages/SingleBlog";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import UserBlogList from "../pages/UserBlogList";
import ErrorPage from "../components/common/ErrorPage";

const routes = {
  path: "/",
  element: (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  ),
  children: [
    { path: "", element: <BlogList /> },
    { path: "blog/:id", element: <SingleBlog /> },
    { path: "blog/edit/:id", element: <EditBlog /> },
    { path: "profile", element: <Profile /> },
    { path: "create-blog", element: <CreateBlog /> },
    { path: "my-blogs", element: <UserBlogList /> },
    { path: "*", element: <ErrorPage message="Page not found!" /> },
  ],
};


const authRoutes = {
  path: "/auth",
  element: (
    <PublicOnlyRoute>
      <Auth />
    </PublicOnlyRoute>
  ),
  children: [
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
  ],
};

const appRouter = createBrowserRouter([routes, authRoutes]);

export default appRouter;
