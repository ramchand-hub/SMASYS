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
  next: NextFunction
) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const pagesize = Math.max(1, Number(req.query.pagesize) || 5);
    const searchquery = String(req.query.searchquery || "");

    const skip = (page - 1) * pagesize;

    // Escape special regex characters
    const safeSearch = searchquery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const filter = {
      $or: [
        {
          class_name: {
            $regex: safeSearch,
            $options: "i"
          }
        },
        {
          section: {
            $regex: safeSearch,
            $options: "i"
          }
        }
      ]
    };

    // Count classes matching the search
    const classes_count = await Class_schema.countDocuments(filter);

    // Fetch classes with teacher names
    const classeslist = await Class_schema.aggregate([
      {
        $match: filter
      },
      {
        $sort: {
          _id: -1
        }
      },
      {
        $skip: skip
      },
      {
        $limit: pagesize
      },
      {
        $lookup: {
          from: "teachers",
          localField: "class_teacher",
          foreignField: "_id",
          as: "teacher_details"
        }
      },
      {
        $unwind: {
          path: "$teacher_details",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          class_name: 1,
          section: 1,
          max_students: 1,
          class_teacher: 1,
          teacher_name: {
            $ifNull: ["$teacher_details.name", "Not assigned"]
          }
        }
      }
    ]);

    const total_pages = Math.ceil(classes_count / pagesize);

    return res.status(200).json(
      successResponse(
        classeslist.length > 0
          ? "Classes retrieved successfully"
          : "No classes found",
        {
          classeslist,
          pagination: {
            page,
            pagesize,
            classes_count,
            total_pages
          }
        }
      )
    );

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

export const getTeacheroption = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const class_teacher = await Teacher.find(
            {},

            {
                _id: 1, name: 1
            }

        )
        if (class_teacher) {
            res.json(successResponse("Class teacher options retrieved", class_teacher));
        } else {
            return res.status(404).json(errorResponse("Class teacher options not found"));
        }


    } catch (err) {
        next(err);
    }
};