import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../utils/messages";
import attendance from "../models/Attendance_schema"
import axios from "axios"
export const create_attendance = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = req.body;

        // ---------- Convert date from DD-MM-YYYY to Date ----------
        let parsedDate: Date;

        if (typeof result.date === "string") {
            const [day, month, year] = result.date.split("-");

            parsedDate = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );

            // Validate date
            if (
                isNaN(parsedDate.getTime()) ||
                parsedDate.getDate() !== Number(day) ||
                parsedDate.getMonth() !== Number(month) - 1 ||
                parsedDate.getFullYear() !== Number(year)
            ) {
                return res.status(400).json(
                    errorResponse("Invalid date format. Use DD-MM-YYYY")
                );
            }
        } else {
            parsedDate = new Date(result.date);

            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json(
                    errorResponse("Invalid date")
                );
            }
        }

        result.date = parsedDate;

        // ---------- Fetch students from Student microservice ----------
        const student_res = await axios.get(
            "http://localhost:3002/students/getStudentsList",
            {
                params: {
                    page: 1,
                    pagesize: 100,
                },
            }
        );

        if (!student_res.data?.success) {
            return res.status(400).json(
                errorResponse("Unable to fetch students")
            );
        }

        const students = student_res.data.data.studentlist;

        // ---------- Validate student class membership ----------
        const invalidStudent = result.attendance.some((record: any) => {
            const student = students.find(
                (item: any) => item._id === record.student_id
            );

            return !student || student.class !== result.class_id;
        });

        if (invalidStudent) {
            return res.status(400).json(
                errorResponse("Student does not belong to the selected class")
            );
        }


        // ---------- Check existing attendance for class and date ----------
        const isExist = await attendance.findOne({
            class_id: result.class_id,
            date: parsedDate,
        });

        let attendance_res;

        if (isExist) {
            const existingstudent = result.attendance.find((item: any) =>
                isExist.attendance.some((record: any) =>
                    record.student_id.toString() === item?.student_id
                )
            )

            if (existingstudent) {
                return res.status(409).json(errorResponse("Attendence already taken for this student..."))
            }

            attendance_res = await attendance.findByIdAndUpdate(
                isExist._id,
                {
                    $push: {
                        attendance: {
                            $each: result.attendance,
                        },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                },
            );
        } else {
            attendance_res = await attendance.create(result);
        }

        if (attendance_res) {
            return res.status(201).json(
                successResponse("Attendance created successfully", attendance_res)
            );
        }

        return res.status(400).json(
            errorResponse("Attendance was not created")
        );
    } catch (err) {
        next(err);
    }
};

export const timetablelist = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {

        const page = Number(req.query.page || 1);
        const pagesize = Number(req.query.pagesize || 10);
        const class_id = req.query.class_id;
        const skip = (page - 1) * pagesize;
        const filter = class_id ? { class_id } : {};

        const timetable_list = await attendance.find(filter).sort({ day: 1, _id: 1 }).skip(skip).limit(pagesize);
        const timetablecount = await attendance.countDocuments(filter);
        const totalpages = Math.ceil(timetablecount / pagesize)
        const pagination = {
            page: page,
            pagesize: pagesize,
            timetablecount,
            totalpages
        }
        if (timetable_list?.length > 0) {
            return res.status(201).json(successResponse("Timetable list fetched successfully ", {
                timetable_list,
                pagination
            }));

        } else {
            return res.status(400).json(errorResponse("Timetable is not found"))

        }


    } catch (err) {
        next(err);
    }
};