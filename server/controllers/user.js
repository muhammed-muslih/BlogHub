import asyncHandler from "express-async-handler";
import * as userServices from "../services/user.js";
import AppError from "../utils/appError.js";

//get current user’s profile
//@route POST /api/user/me
const getCurrentUser = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user;
  const user = await userServices.findUserById(userId);

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      id: user.id,
      userName: user.userName,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
});

export { getCurrentUser };
