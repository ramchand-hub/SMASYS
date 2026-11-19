import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../utils/messages";
import attendance from "../models/Attendance_schema"
import axios from "axios"
import mongoose from "mongoose";

// export const create_attendance = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     try {
//         const result = req.body;
//         const page = Number(req.query.page) || 1;
//         const pagesize = Number(req.query.pagesize) || 10;
//         // ---------- Convert date from DD-MM-YYYY to Date ----------
//         let parsedDate: Date;

//         if (typeof result.date === "string") {
//             const [day, month, year] = result.date.split("-");

//             parsedDate = new Date(
//                 Number(year),
//                 Number(month) - 1,
//                 Number(day)
//             );

//             // Validate date
//             if (
//                 isNaN(parsedDate.getTime()) ||
//                 parsedDate.getDate() !== Number(day) ||
//                 parsedDate.getMonth() !== Number(month) - 1 ||
//                 parsedDate.getFullYear() !== Number(year)
//             ) {
//                 return res.status(400).json(
//                     errorResponse("Invalid date format. Use DD-MM-YYYY")
//                 );
//             }
//         } else {
//             parsedDate = new Date(result.date);

//             if (isNaN(parsedDate.getTime())) {
//                 return res.status(400).json(
//                     errorResponse("Invalid date")
//                 );
//             }
//         }

//         result.date = parsedDate.getTime();

//         // ---------- Fetch students from Student microservice ----------
//         const student_res = await axios.get(
//             "http://localhost:3002/students/getStudentsList",
//             {
//                 params: {
//                     page: page,
//                     pagesize: pagesize,
//                 },
//             }
//         );

//         if (!student_res.data?.success) {
//             return res.status(400).json(
//                 errorResponse("Unable to fetch students")
//             );
//         }

//         const students = student_res.data.data.studentlist;

//         // ---------- Validate student class membership ----------
//         const invalidStudent = result.attendance.some((record: any) => {
//             const student = students.find(
//                 (item: any) => item._id === record.student_id
//             );

//             return !student || student.class !== result.class_id;
//         });

//         if (invalidStudent) {
//             return res.status(400).json(
//                 errorResponse("Student does not belong to the selected class")
//             );
//         }


//         // ---------- Check existing attendance for class and date ----------
//         const isExist = await attendance.findOne({
//             class_id: result.class_id,
//             date: parsedDate,
//         });

//         let attendance_res;

//         if (isExist) {
//             const existingstudent = result.attendance.find((item: any) =>
//                 isExist.attendance.some((record: any) =>
//                     record.student_id.toString() === item?.student_id
//                 )
//             )

//             if (existingstudent) {
//                 return res.status(409).json(errorResponse("Attendence already taken for this student..."))
//             }

//             attendance_res = await attendance.findByIdAndUpdate(
//                 isExist._id,
//                 {
//                     $push: {
//                         attendance: {
//                             $each: result.attendance,
//                         },
//                     },
//                 },
//                 {
//                     new: true,
//                     runValidators: true,
//                 },
//             );
//         } else {
//             attendance_res = await attendance.create(result);
//         }

//         if (attendance_res) {
//             return res.status(201).json(
//                 successResponse("Attendance created successfully", attendance_res)
//             );
//         }

//         return res.status(400).json(
//             errorResponse("Attendance was not created")
//         );
//     } catch (err) {
//         next(err);
//     }
// };


export const create_attendance = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = req.body;

        // ---------- Validate date (DD-MM-YYYY) ----------
        const dateMatch = /^(\d{2})-(\d{2})-(\d{4})$/.exec(result.date || "");

        if (!dateMatch) {
            return res.status(400).json(
                errorResponse("Invalid date format. Use DD-MM-YYYY")
            );
        }

        const day = Number(dateMatch[1]);
        const month = Number(dateMatch[2]);
        const year = Number(dateMatch[3]);

        const checkDate = new Date(Date.UTC(year, month - 1, day));

        if (
            checkDate.getUTCDate() !== day ||
            checkDate.getUTCMonth() !== month - 1 ||
            checkDate.getUTCFullYear() !== year
        ) {
            return res.status(400).json(
                errorResponse("Invalid date")
            );
        }

        // Store date as midnight IST timestamp
        const parsedDate = new Date(
            `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00+05:30`
        ).getTime();

        // ---------- Validate request ----------
        if (!mongoose.Types.ObjectId.isValid(result.class_id)) {
            return res.status(400).json(
                errorResponse("Invalid class ID")
            );
        }

        if (!Array.isArray(result.attendance) || result.attendance.length === 0) {
            return res.status(400).json(
                errorResponse("Attendance records are required")
            );
        }

        // ---------- Fetch students from Student microservice ----------
        const studentUrl = "http://localhost:3002/students/getStudentsList";

        const pagesize = 100;

        const student_res = await axios.get(studentUrl, {
            params: {
                page: 1,
                pagesize
            }
        });

        if (!student_res.data?.success) {
            return res.status(400).json(
                errorResponse("Unable to fetch students")
            );
        }

        const studentData = student_res.data.data;
        let students = studentData.studentlist || [];

        // Fetch remaining pages if available
        const totalPages = Number(
            studentData.pagination?.Totalpages || 1
        );

        for (let page = 2; page <= totalPages; page++) {
            const nextPage = await axios.get(studentUrl, {
                params: {
                    page,
                    pagesize
                }
            });

            if (!nextPage.data?.success) {
                return res.status(400).json(
                    errorResponse("Unable to fetch students")
                );
            }

            students = [
                ...students,
                ...(nextPage.data.data.studentlist || [])
            ];
        }

        // ---------- Validate student class membership ----------
        const studentIds = result.attendance.map(
            (record: any) => String(record.student_id)
        );

        // Check duplicate students in request
        if (new Set(studentIds).size !== studentIds.length) {
            return res.status(400).json(
                errorResponse("Duplicate students found in attendance")
            );
        }

        const invalidStudent = result.attendance.some((record: any) => {
            const student = students.find(
                (item: any) =>
                    String(item._id) === String(record.student_id)
            );

            return (
                !student ||
                String(student.class) !== String(result.class_id)
            );
        });

        if (invalidStudent) {
            return res.status(400).json(
                errorResponse("Student does not belong to the selected class")
            );
        }

        // ---------- Check existing attendance ----------
        const isExist = await attendance.findOne({
            class_id: result.class_id,
            date: parsedDate
        });

        let attendance_res;

        if (isExist) {

            // Check whether attendance already exists for any submitted student
            const existingStudent = result.attendance.find(
                (item: any) =>
                    isExist.attendance.some(
                        (record: any) =>
                            String(record.student_id) ===
                            String(item.student_id)
                    )
            );

            if (existingStudent) {
                return res.status(409).json(
                    errorResponse("Attendance already taken for this student")
                );
            }

            attendance_res = await attendance.findByIdAndUpdate(
                isExist._id,
                {
                    $push: {
                        attendance: {
                            $each: result.attendance
                        }
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        } else {

            // ---------- Create new attendance ----------
            const attendancePayload = {
                ...result,
                date: parsedDate
            };

            attendance_res = await attendance.create(attendancePayload);
        }

        if (attendance_res) {
            return res.status(201).json(
                successResponse(
                    "Attendance created successfully",
                    attendance_res
                )
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
        const page = Math.max(1, Number(req.query.page) || 1);
        const pagesize = Math.max(1, Number(req.query.pagesize) || 10);

        const class_id = req.query.class_id;
        const date = req.query.require_date;

        const filter: any = {};

        // ---------- Class filter ----------
        if (class_id) {
            if (!mongoose.Types.ObjectId.isValid(class_id as string)) {
                return res.status(400).json(
                    errorResponse("Invalid class ID")
                );
            }

            filter.class_id = new mongoose.Types.ObjectId(class_id as string);
        }

        // ---------- Date filter (DD-MM-YYYY) ----------
        if (date) {
            const dateMatch = /^(\d{2})-(\d{2})-(\d{4})$/.exec(date as string);

            if (!dateMatch) {
                return res.status(400).json(
                    errorResponse("Invalid date format. Use DD-MM-YYYY")
                );
            }

            const day = Number(dateMatch[1]);
            const month = Number(dateMatch[2]);
            const year = Number(dateMatch[3]);

            const checkDate = new Date(Date.UTC(year, month - 1, day));

            if (
                checkDate.getUTCDate() !== day ||
                checkDate.getUTCMonth() !== month - 1 ||
                checkDate.getUTCFullYear() !== year
            ) {
                return res.status(400).json(
                    errorResponse("Invalid date")
                );
            }

            filter.date = new Date(
                `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00+05:30`
            ).getTime();
        }

        // ---------- Fetch attendance records ----------
        const attendance_list = await attendance.aggregate([
            {
                $match: filter
            },
            {
                $sort: {
                    date: -1,
                    _id: 1
                }
            }
        ]);

        // ---------- Fetch all students ----------
        const studentUrl =
            "http://localhost:3002/students/getStudentsList";

        const studentPageSize = 100;

        const student_res = await axios.get(studentUrl, {
            params: {
                page: 1,
                pagesize: studentPageSize
            }
        });

        if (!student_res.data?.success) {
            return res.status(400).json(
                errorResponse("Unable to fetch students")
            );
        }

        let students = student_res.data.data.studentlist || [];

        const studentTotalPages = Number(
            student_res.data.data.pagination?.Totalpages || 1
        );

        for (let i = 2; i <= studentTotalPages; i++) {
            const nextStudentPage = await axios.get(studentUrl, {
                params: {
                    page: i,
                    pagesize: studentPageSize
                }
            });

            if (!nextStudentPage.data?.success) {
                return res.status(400).json(
                    errorResponse("Unable to fetch students")
                );
            }

            students.push(
                ...(nextStudentPage.data.data.studentlist || [])
            );
        }

        // ---------- Fetch all classes ----------
        const classUrl =
            "http://localhost:3003/classes/getclassesList";

        const classPageSize = 100;

        const class_res = await axios.get(classUrl, {
            params: {
                page: 1,
                pagesize: classPageSize
            }
        });

        if (!class_res.data?.success) {
            return res.status(400).json(
                errorResponse("Unable to fetch classes")
            );
        }

        let classes = class_res.data.data.classeslist || [];

        const classTotalPages = Number(
            class_res.data.data.pagination?.total_pages || 1
        );

        for (let i = 2; i <= classTotalPages; i++) {
            const nextClassPage = await axios.get(classUrl, {
                params: {
                    page: i,
                    pagesize: classPageSize
                }
            });

            if (!nextClassPage.data?.success) {
                return res.status(400).json(
                    errorResponse("Unable to fetch classes")
                );
            }

            classes.push(
                ...(nextClassPage.data.data.classeslist || [])
            );
        }

        // ---------- Create lookup maps ----------
        const studentMap = new Map(
            students.map((student: any) => [
                String(student._id),
                student
            ])
        );

        const classMap = new Map(
            classes.map((item: any) => [
                String(item._id),
                item
            ])
        );

        // ---------- Flatten attendance records ----------
        const formattedAttendance = attendance_list.flatMap(
            (item: any) => {

                const classDetails: any = classMap.get(
                    String(item.class_id)
                );

                const formattedDate = new Intl.DateTimeFormat(
                    "en-GB",
                    {
                        timeZone: "Asia/Kolkata",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }
                ).format(new Date(item.date));

                return item.attendance.map((record: any) => {

                    const student: any = studentMap.get(
                        String(record.student_id)
                    );

                    return {
                        student_id: record.student_id,

                        student_name: student
                            ? `${student.first_name} ${student.last_name}`
                            : "Student not found",

                        rollno: student?.rollno || "",

                        class_id: item.class_id,

                        class_name: classDetails
                            ? `${classDetails.class_name}-${classDetails.section}`
                            : "Class not found",

                        date: formattedDate,

                        status: record.status
                    };
                });
            }
        );

        // ---------- Pagination ----------
        const attendance_list_count = formattedAttendance.length;

        const totalpages = Math.ceil(
            attendance_list_count / pagesize
        );

        const skip = (page - 1) * pagesize;

        const paginatedAttendance = formattedAttendance.slice(
            skip,
            skip + pagesize
        );

        const pagination = {
            page,
            pagesize,
            attendance_list_count,
            totalpages
        };

        return res.status(200).json(
            successResponse(
                "attendance_list fetched successfully",
                {
                    attendance_list: paginatedAttendance,
                    pagination
                }
            )
        );

    } catch (err) {
        next(err);
    }
};
