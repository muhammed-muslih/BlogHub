import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const hashPassword = async (password) => {
  const hash = await argon2.hash(password);
  return hash;
};

const verifyPassword = async (hash, password) => {
  return await argon2.verify(hash, password);
};

const generateToken = (payload) => {
  return jwt.sign(payload, config.JWT.SECRET, {
    expiresIn: config.JWT.EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.JWT.SECRET);
};

export { hashPassword, verifyPassword, generateToken, verifyToken };
