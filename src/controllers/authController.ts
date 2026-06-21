import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/messages";
import { sendLoginWelcomeEmail } from "../utils/mailer";

const JWT_SECRET =
  process.env.JWT_SECRET?.trim() || "smasys_default_jwt_secret_2024";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json(errorResponse("Email and password required"));

    const user = await User.findOne({ email });
    console.log("Login attempt for email:", email, "Found user:", user);
    if (!user)
      return res.status(401).json(errorResponse("Invalid credentials"));
    // const valid = await bcrypt.compare(password, );
    // if (!valid)
    //   return res.status(401).json(errorResponse("Invalid credentials"));

    const payload: any = { id: user._id, email: user.email };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    res.json(
      successResponse("Login successful", {
        token,
      }),
    );

    // Send welcome email in background (do not block login response)
    await sendLoginWelcomeEmail(user.email, user.name).catch((mailErr) => {
      console.error("Failed to send login welcome email:", mailErr);
    });
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json(errorResponse("Email and password  and name is required"));

    const user = await User.create({ name, email, password });

    res.json(successResponse("user registered successfully..", user?.email));
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    next(err);
  }
};

export default {
  login,
};
