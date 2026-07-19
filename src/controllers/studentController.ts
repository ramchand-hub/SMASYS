import { Request, Response, NextFunction } from 'express';
import Student, { IStudent } from '../models/Student';
import { successResponse, errorResponse } from '../utils/messages';
import logger from '../utils/logger';
export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = req.body;
    if(!result){
      res.status(400).json(errorResponse("all fields required.."))
    }

    const Existing_student = await Student.findOne({
      student_mail:result?.student_mail
    })
    if(Existing_student){
          return res.status(409).json(errorResponse('Student already exist..'));

    }
    const student = await Student.create(result);
    if(!student){
          return  res.status(400).json(errorResponse("student is not created"))

    }
    else{
    return res.status(201).json(successResponse('Student created', student));

    }
  } catch (err:any) {
    logger.error("create student failed",{
      error:err?.message
    })
    next(err);
  }
};

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
      
    const students = await Student.find();
    const count_result = await Student.aggregate([{
      $count:"students_count"
    }])

    if(students.length === 0) {
      return res.json(successResponse("No students found", []));
    }else{
      return res.json(successResponse("Students retrieved successfully", {students, students_count:count_result[0].students_count}));
    }
  } catch (err) {
    next(err);
  }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json(errorResponse('Student not found'));
    res.json(successResponse('Student retrieved', student));
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json(errorResponse('Student not found'));
    res.json(successResponse('Student updated', student));
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json(errorResponse('Student not found'));
    res.json(successResponse('Student deleted', null));
  } catch (err) {
    next(err);
  }
};
