import AppError from "../utils/appError.js";
import { config } from "../config/config.js";

const validateRequest = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req['body']);

    if (!result.success) {
      const errorMessage = result.error.issues
        .map((issue) => issue.message)
        .join(", ");

      if (config.ENV === "development") {
        console.log("Validation error:", result.error.issues);
      }
      return next(new AppError(errorMessage, 400));
    }

    req.body = result?.data;
    next();
  } catch (error) {
    if (config.ENV === "development") {
      console.error("Validation middleware exception:", error);
    }
    return next(new AppError("Validation error", 400));
  }
};
export default validateRequest;
