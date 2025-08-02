import AppError from "../utils/appError.js";
import * as authServices from "../services/auth.js";

const userAuth = (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Authentication required.", 401));
  }

  try {
    const decoded = authServices.verifyToken(token);

    if (!decoded) {
      return next(new AppError("Invalid or expired token.", 401));
    }

    req.user = { id: decoded.userId, email: decoded.email };

    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token.", 401));
  }
};
export default userAuth;
