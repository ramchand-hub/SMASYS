// import { Request, Response, NextFunction } from "express";
// import bcrypt from "bcryptjs";
// import User from "../models/User";
// import { successResponse, errorResponse } from "../utils/messages";

// export const registerUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { name, email, password } = req.body;

//     console.log("Register request received for:", email);

//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json(errorResponse("name, email and password are required"));
//     }

//     const existing = await User.findOne({ email });
//     if (existing) {
//       console.log("Email already exists");
//       return res.status(409).json(errorResponse("Email already registered"));
//     }

//     const hash = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       passwordHash: hash,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: {
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err: any) {
//     console.error("Server error:", err.message || err);
//     return next(err);
//   }
// };

// export default {
//   registerUser,
// };
