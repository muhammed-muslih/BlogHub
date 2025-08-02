import express from "express";
import * as authController from "../controllers/auth.js";
import validateRequest from "../middlewares/validateRequest.js";
import * as authValidationSchema from "../validations/authValidation.js";

const router = express.Router();

router.post(
  "/register",
  validateRequest(authValidationSchema.userRegisterSchema),
  authController.registerUser
);
router.post(
  "/login",
  validateRequest(authValidationSchema.userLoginSchema),
  authController.loginUser
);
router.post("/logout", authController.logoutUser);

export default router;
