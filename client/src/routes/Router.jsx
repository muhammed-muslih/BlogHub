import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout";
import Auth from "../pages/Auth";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AuthProvider from "./AuthProvider";
import PublicOnlyRoute from "./PublicOnlyRoute";

const routes = {
  path: "/",
  element: (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  ),
  // errorElement: <ErrorPage />,
};

const authRoutes = {
  path: "/auth",
  element: (
    <PublicOnlyRoute>
      <Auth />
    </PublicOnlyRoute>
  ),
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
};

const appRouter = createBrowserRouter([routes, authRoutes]);

export default appRouter;
