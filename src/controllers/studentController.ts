import { Request, Response, NextFunction } from 'express';
import Student, { IStudent } from '../models/Student';
import { successResponse, errorResponse } from '../utils/messages';
import logger from '../utils/logger';
export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = req.body;
    if (!result) {
      res.status(400).json(errorResponse("all fields required.."))
    }

    const Existing_student = await Student.findOne({
      rollno: result?.rollno
    })
    if (Existing_student) {
      return res.status(409).json(errorResponse('Student already exist..'));

    }
    const student = await Student.create(result);
    if (!student) {
      return res.status(400).json(errorResponse("student is not created"))

    }
    else {
      return res.status(201).json(successResponse('Student created', student));

    }
  } catch (err: any) {
    logger.error("create student failed", {
      error: err?.message
    })
    next(err);
  }
};

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const page = Number(req.query.page) || 1;
    const pagesize = Number(req.query.pagesize) || 5;
    const serachquery = req.query.searchquery || "";
        const currentpage = (page - 1) * pagesize;

    const students_count = await Student.countDocuments()
    const studentlist = await Student.find({
      $or:[
        {
          first_name:{
            $regex:serachquery, $options:"i"
          }
        },
        {
          last_name:{
            $regex:serachquery, $options:"i"
          }
        },
        {
          rollno:{
            $regex:serachquery, $options:"i"
          }
        },
      ]
    }).skip(currentpage).limit(pagesize)
    const Totalpages = Math.ceil(students_count / pagesize)
    if (studentlist?.length === 0) {
      return res.json(successResponse("No students found", []));
    } else {
      return res.json(successResponse("Students retrieved successfully", {
        studentlist, pagination: {
          page,
          pagesize,
          students_count,
          Totalpages
        }
      }));
    }
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json(errorResponse('Student not found'));
    return res.status(200).json(successResponse('Student updated successfully', student));
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json(errorResponse('Student not found'));
    return res.status(200).json(successResponse('Student deleted', null));
  } catch (err) {
    next(err);
  }
};
