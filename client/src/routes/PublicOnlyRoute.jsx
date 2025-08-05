import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const PublicOnlyRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
};

export default PublicOnlyRoute;
