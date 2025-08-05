import asyncHandler from "express-async-handler";
import * as authServices from "../services/auth.js";
import * as userServices from "../services/user.js";
import AppError from "../utils/appError.js";
import { config } from "../config/config.js";

//register user
//@route POST /api/auth/register
const registerUser = asyncHandler(async (req, res, next) => {
  let { userName, email, password } = req.body;

  const isEmailExist = await userServices.findUserByEmail(email);
  if (isEmailExist) {
    throw new AppError(
      "This email is already registered. Please sign in or use a different email address.",
      409
    );
  }

  const isUserNameExist = await userServices.findUserByUserName(userName);
  if (isUserNameExist) {
    throw new AppError(
      "This username is already taken. Please choose another one.",
      409
    );
  }

  password = await authServices.hashPassword(password);

  const user = await userServices.registerUser(userName, email, password);

  const token = authServices.generateToken({
    userId: user.id,
    email: user.email,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    status: "success",
    message: "New user registered successfully ",
  });
});

//login user
//@route POST /api/auth/login
const loginUser = asyncHandler(async (req, res, next) => {
  let { userName, email, password } = req.body;

  if (!userName && !email) {
    throw new AppError("Please provide a username or email.", 400);
  }

  const user = userName
    ? await userServices.findUserByUserName(userName)
    : await userServices.findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid username or email.", 401);
  }

  const isPasswordValid = await authServices.verifyPassword(
    user.password,
    password
  );
  if (!isPasswordValid) {
    throw new AppError("Invalid password.", 401);
  }

  const token = authServices.generateToken({
    userId: user.id,
    email: user.email,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
  });
});

//logout user
//@route POST /api/auth/logout
const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

export { registerUser, loginUser, logoutUser };
