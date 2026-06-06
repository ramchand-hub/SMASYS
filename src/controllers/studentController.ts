import { Request, Response, NextFunction } from 'express';
import Student, { IStudent } from '../models/Student';
import { successResponse, errorResponse } from '../utils/messages';

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await Student.create(req.body as Partial<IStudent>);
    res.status(201).json(successResponse('Student created', student));
  } catch (err) {
    next(err);
  }
};

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
      
    const students = await Student.find();
    if(students.length === 0) {
      return res.json(successResponse("No students found", []));
    }else{
      return res.json(successResponse("Students retrieved successfully", students));
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
