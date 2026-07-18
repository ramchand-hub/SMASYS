import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/messages";
import { sendLoginWelcomeEmail } from "../utils/mailer";
import  upload  from "../models/file";


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

    return res.json(
      successResponse("user registered successfully..", user?.email),
    );
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


    res.json(
      successResponse("Login successful"
      ),
    );

    // Send welcome email in background (do not block login response)
    await sendLoginWelcomeEmail(user.email, user.name).catch((mailErr) => {
      console.error("Failed to send login welcome email:", mailErr);
    });
  } catch (err) {
    next(err);
  }
};

export const forgot_password = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json(errorResponse("Email is required"));

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json(errorResponse("Invalid credentials"));

    return res.json(
      successResponse("password sent to email", { name: user?.name }),
    );
  } catch (err) {
    next(err);
  }
};

export const update_password = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, newpassword } = req.body;
    if (!newpassword || !email)
      return res
        .status(400)
        .json(errorResponse("email and new password is required"));
    const user_mail = await User.findOne({ email });
    if (!user_mail) {
      return res.status(401).json(errorResponse("user is not found!!"));
    }
    const user = await User.updateOne({
      $set: {
        password: newpassword,
      },
    });

    if(user_mail?.password === newpassword){
     return res.json(successResponse("password updated alreday",{}))
    }else{
    return res.json(successResponse("password updated successfully", {}));

    }

  } catch (err) {
    next(err);
  }
};

export const upload_file = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = req.body;
    if (!file)
      return res
        .status(400)
        .json(errorResponse("File is required.."));
    const user_file = await upload.insertMany(
      file.map((item)=>({
          originalname: item.originalname,
       filename: item.filename,
     mimeType: item.mimetype,
       size: item.size,
       path: item.path,
      })
      
      )
  //     {
  //     originalname: file.originalname,
  //     filename: file.filename,
  //     mimeType: file.mimetype,
  //     size: file.size,
  //     path: file.path,
  // }
)
    if (!user_file) {
      return res.status(401).json(errorResponse("file is not found!!"));
    }else{
      return res.status(201).json({
      success: true,
      message: "File uploaded successfully.",
      data: user_file,
    });
    }

  } catch (err) {
    next(err);
  }
};

export const download_file = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = req.params.id;
    if (!file)
      return res
        .status(400)
        .json(errorResponse("File is required.."));

        const file_id = await upload.findById(file);
        
    if (!file_id) {
      return res.status(401).json(errorResponse("file is not found!!"));
    }else{
      return res.status(200).json({
      success: true,
      message: "File downloaded successfully.",
      data: file_id,
    });
    }

  } catch (err) {
    next(err);
  }
};
