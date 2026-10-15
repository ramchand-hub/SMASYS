import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../utils/messages";
import timetable from "../models/Timetable_schema"
export const createTimetable = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {

        const result = req.body
        const isExist = await timetable.findOne({
            class_id: result.class_id,
            day: result.day
        });

        let time_table;

        if (isExist) {
            time_table = await timetable.findByIdAndUpdate(
                isExist._id,
                {
                    $push: {
                        schedule: { $each: result.schedule }
                    }
                },
                { new: true, runValidators: true }
            );
        } else {
            time_table = await timetable.create(result);
        }

        if (time_table) {
            return res.status(201).json(successResponse("time_table created", time_table));

        } else {
            return res.status(400).json(errorResponse("time_table is not found"))

        }
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

        const timetable_list = await timetable.find(filter).sort({ day: 1, _id: 1 }).skip(skip).limit(pagesize);
        const timetablecount = await timetable.countDocuments(filter);
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