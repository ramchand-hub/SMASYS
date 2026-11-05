import { z } from "zod"
export const createtimetableSchema = z.object({
    body: z.object({
        class_id: z.string().min(1, "class_id is required").max(24),
        day: z.string().min(1, 'day is required'),
        schedule: z.array(
            z.object({
                time_from: z.string().min(1, "time_from required").max(24),
                time_to: z.string().min(1, 'time_to is required'),
                subject: z.string().min(1, 'subject is required')
            })
        ).min(1, "At least one student attendance is required...")
    }),

});

export const timetablelistSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1),
        pagesize: z.coerce.number().int().min(1),
        class_id: z.string().min(1).max(24),
    }),

});