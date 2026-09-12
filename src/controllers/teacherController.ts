import { Request, Response, NextFunction } from "express";
import Teacher, { ITeacher } from "../models/Teacher";
import { successResponse, errorResponse } from "../utils/messages";

export const createTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const result = req.body
    const isExist = await Teacher.findOne({
      Email: result?.Email
    })
    if (isExist) {
      return res.status(409).json(errorResponse("teacher is already exist.."))
    }
    const teacher = await Teacher.create(result);

    if (teacher) {
      return res.status(201).json(successResponse("Teacher created", teacher));

    } else {
      return res.status(400).json(errorResponse("teacher is not found"))

    }
  } catch (err) {
    next(err);
  }
};

export const getTeachers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, pagesize }: any = _req.query
    const teachers = await Teacher.find();
    // const teacher_count = await Teacher.aggregate([{
    //   $count:"Teachers_count"
    // }])
    const teacher_count = await Teacher.countDocuments();

    // Calculate total pages
    const total_pages = Math.ceil(teacher_count / pagesize);

    if (teachers.length === 0) {
      return res.json(successResponse("No teachers found", []));
    } else {
      return res.json(successResponse("Teachers retrieved successfully", {
        teachers, pagination: {
          page,
          pagesize,
          teacher_count,
          total_pages
        }
      }));

    }
  } catch (err) {
    next(err);
  }
};

export const getTeacherById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher)
      return res.status(404).json(errorResponse("Teacher not found"));
    res.json(successResponse("Teacher retrieved", teacher));
  } catch (err) {
    next(err);
  }
};

export const updateTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json(errorResponse("No update fields provided"));
    }

    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(
      "Update request for teacher ID:",
      req.params.id,
      "Update data:",
      req.body,
      "Resulting teacher:",
      teacher,
    );
    if (!teacher)
      return res.status(404).json(errorResponse("Teacher not found"));
    res.json(successResponse("Teacher updated", teacher));
  } catch (err) {
    next(err);
  }
};

export const deleteTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher)
      return res.status(404).json(errorResponse("Teacher not found"));
    res.json(successResponse("Teacher deleted", null));
  } catch (err) {
    next(err);
  }
};
