import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import colors from "colors";
import { config } from "./config/config.js";
import errorHandler from "./middlewares/errorHandler.js";
import AppError from "./utils/appError.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cookieParser());

//database connection
connectDB();

//routes
server.use("/api/auth", authRoutes);
server.use("/api/user", userRoutes);

//catch not founded routes and forwards to error handlers
server.use((req, res, next) => {
  next(new AppError("Not Found", 404));
});

//error handler
server.use(errorHandler);

const PORT = config.PORT;

// start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgGreen.black);
});

// handle server errors
server.on("error", (err) => {
  console.error(`Failed to start server: ${err?.message}`.bgRed.white);
  process.exit(1);
});
