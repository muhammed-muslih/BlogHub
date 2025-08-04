import { useSelector } from "react-redux";
import { isLoggedIn } from "../redux/features/authSlice";
import { Navigate } from "react-router-dom";

const AuthProvider = ({children}) => {
  const loggedInstatus = useSelector(isLoggedIn);
  console.log("loggedIn", loggedInstatus);
  if (!loggedInstatus) {
    return <Navigate to={"/auth/login"} />;
  } else {
    {
      return children;
    }
  }
};

export default AuthProvider;
