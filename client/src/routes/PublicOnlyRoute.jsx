import { useSelector } from "react-redux";
import { isLoggedIn } from "../redux/features/authSlice";
import { Navigate } from "react-router-dom";

const PublicOnlyRoute = ({ children }) => {
  const loggedInStatus = useSelector(isLoggedIn);

  if (loggedInStatus) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicOnlyRoute;
