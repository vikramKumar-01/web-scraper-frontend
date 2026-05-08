import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { hashPassword, verifyPassword } from "../utils/passwords.js";
import { createAuthToken } from "../utils/token.js";

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function sanitizeUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  };
}

export const register = asyncHandler(async (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || "");

  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required.", 400);
  }

  if (password.length < 6) {
    throw new AppError("Password must be at least 6 characters long.", 400);
  }

  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    throw new AppError("An account with this email already exists.", 409);
  }

  const { salt, hash } = hashPassword(password);
  const user = await User.create({
    name,
    email,
    passwordHash: hash,
    passwordSalt: salt
  });

  res.status(201).json({
    success: true,
    token: createAuthToken(user),
    user: sanitizeUser(user)
  });
});

export const login = asyncHandler(async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || "");

  if (!email || !password) {
    throw new AppError("Email and password are required.", 400);
  }

  const user = await User.findOne({ email });

  if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
    throw new AppError("Invalid email or password.", 401);
  }

  res.status(200).json({
    success: true,
    token: createAuthToken(user),
    user: sanitizeUser(user)
  });
});
