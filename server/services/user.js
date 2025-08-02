import User from "../models/user.js";

const registerUser = async (userName, email, password) =>
  await User.create({ userName, email, password });

const findUserByEmail = async (email) => await User.findOne({ email });

const findUserByUserName = async (userName) => await User.findOne({ userName });

const findUserById = async (id) => await User.findById(id);

export { registerUser, findUserByEmail, findUserByUserName, findUserById };
