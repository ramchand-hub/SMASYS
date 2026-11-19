import {z} from "zod"
export const createAttendanceSchema = z.object({
  body: z.object({
    class_id: z.string()
      .min(1, "Class ID is required")
      .length(24, "Invalid class ID"),

    date: z.string()
      .min(1, "Date is required")
      .regex(
        /^\d{2}-\d{2}-\d{4}$/,
        "Date must be in DD-MM-YYYY format"
      ),

    attendance: z.array(
      z.object({
        student_id: z.string()
          .min(1, "Student ID is required")
          .length(24, "Invalid student ID"),

        status: z.string()
          .min(1, "Attendance status is required")
      })
    ).min(1, "At least one student attendance is required")
  })
});

export const AttendancelistSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1),
    pagesize: z.coerce.number().int().min(1),
    class_id: z.string().max(24).optional(),
    require_date: z.string().optional()
  }),
});