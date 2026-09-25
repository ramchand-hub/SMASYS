import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../utils/messages";
import Class_schema from "../models/Class_scema";
import Teacher from "../models/Teacher";

export const createClass = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {

        const {
            class_name,
            section,
            max_students,
            class_teacher,

        } = req.body;

        const Teacher_exist = await Teacher.findById(class_teacher)
        if (!Teacher_exist) {
            return res.status(404).json(
                errorResponse("Teacher not found")
            );
        }

        // 2. Check same class + same section
        const classExist = await Class_schema.findOne({
            class_name,
            section,
        });

        if (classExist) {
            return res.status(400).json(
                errorResponse("Class with this section already exists")
            );
        }

        // 3. Check teacher already assigned
        const teacherAssigned = await Class_schema.findOne({
            class_teacher,
        });

        if (teacherAssigned) {
            return res.status(400).json(
                errorResponse(
                    "Teacher is already assigned to another class"
                )
            );
        }



        const newclass = await Class_schema.create({
            class_name,
            section,
            max_students,
            class_teacher
        });

        if (newclass) {
            return res.status(201).json(successResponse("Class created", newclass));

        } else {
            return res.status(400).json(errorResponse("Class is not found"))

        }
    } catch (err) {
        next(err);
    }
};

export const getclasseslist = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {

        const page = Number(req.query.page) || 1;
        const pagesize = Number(req.query.pagesize) || 5;
        const serachquery = req.query.searchquery || "";


        const currentpage = (page - 1) * pagesize;

        const classes_count = await Class_schema.countDocuments();

        const classeslist = await Class_schema.find({
            $or: [
                {
                    class_name: {
                        $regex: serachquery, $options: "i"
                    }

                },
                {
                    section: {
                        $regex: serachquery, $options: "i"
                    }
                }
            ]
        }).skip(currentpage).limit(pagesize)

        // Calculate total pages
        const total_pages = Math.ceil(classes_count / pagesize);

        if (classeslist?.length === 0) {
            return res.json(successResponse("No classes found", []));
        } else {
            return res.json(successResponse("Classes retrieved successfully", {
                classeslist, pagination: {
                    page,
                    pagesize,
                    classes_count,
                    total_pages
                }
            }));

        }
    } catch (err) {
        next(err);
    }
};


export const updateClass = async (
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

        const classId = req.params.id;
        const result = req.body
        const updateclass = await Class_schema.findByIdAndUpdate(
            classId,
            result,
            {
                new: true,
                runValidators: true,
            }
        );


        if (updateclass) {
            return res.status(200).json(
                successResponse("Class is updated successfully", updateclass)
            );


        } else {
            return res.status(404).json(
                errorResponse("class is not updated")
            );
        }


    } catch (err) {
        next(err);
    }
};

export const deleteClass = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const class_delete = await Class_schema.findByIdAndDelete(req.params.id);
        if (class_delete) {
            res.json(successResponse("Class is deleted", null));
        } else {
            return res.status(404).json(errorResponse("Class is not deleted"));
        }


    } catch (err) {
        next(err);
    }
};
