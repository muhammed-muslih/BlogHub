import { z } from "zod";
const userRegisterSchema = z
  .object({
    userName: z
      .string({ required_error: "Please provide userName." })
      .min(3, "username must be at least 3 characters long.")
      .max(20, "username must not exceed 20 characters."),
    email: z
      .email({ message: "Please provide a valid email address." })
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: "Please provide password." })
      .min(8, "Password must be at least 8 characters long.")
      .max(15, "Password must not exceed 15 characters."),
  })
  .strict();

const userLoginSchema = z
  .object({
    userName: z
      .string()
      .min(3, "Username must be at least 3 characters long.")
      .max(20, "Username must not exceed 20 characters.")
      .optional(),
    email: z
      .email({ message: "Please provide a valid email address." })
      .trim()
      .toLowerCase()
      .optional(),
    password: z
      .string({ required_error: "Please provide password." })
      .min(8, "Password must be at least 8 characters long.")
      .max(15, "Password must not exceed 15 characters."),
  })
  .strict()
  .refine((data) => data.userName || data.email, {
    message: "Please provide either username or email.",
    path: ["userName"],
  });

export { userRegisterSchema, userLoginSchema };
