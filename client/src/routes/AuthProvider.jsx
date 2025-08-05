import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/authSlice";
import { Navigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log("loggedIn", isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} replace />;
  }
  return children;
};

export default AuthProvider;
