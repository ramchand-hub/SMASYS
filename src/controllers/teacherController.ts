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
    if (!teacher) {
      return res.status(404).json(errorResponse("Teacher not found"));

    } else {
      return res.status(200).json(successResponse("Teacher retrieved", teacher));

    }

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
      return res.status(400).json(
        errorResponse("No update fields provided")
      );
    }

    const teacherId = req.params.id;
    const result = req.body
    const teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      result,
      {
        new: true,
        runValidators: true,
      }
    );


    if (teacher) {
      return res.status(200).json(
        successResponse("Teacher is updated", teacher)
      );


    } else {
      return res.status(404).json(
        errorResponse("Teacher not found")
      );
    }


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
    if (teacher) {
      res.json(successResponse("Teacher deleted", null));
    } else {
      return res.status(404).json(errorResponse("Teacher is not deleted"));
    }


  } catch (err) {
    next(err);
  }
};
