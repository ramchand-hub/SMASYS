import {z} from "zod"
export const createAttendanceSchema = z.object({
  body: z.object({
    class_id: z.string().min(1,"class_id is required").max(24),
    date: z.string().min(1,'date is required'),
    attendance:z.array(
        z.object({
            student_id:z.string().min(1,"student_id required").max(24),
            status:z.string().min(1,'status is required')
        })
    ).min(1,"At least one student attendance is required...")
  }),

});