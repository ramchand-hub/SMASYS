import z from "zod"

export const createClassSchema = z.object({
    body: z.object({
        class_name: z.string().min(2),
        section: z.string().min(1),
        max_students: z.coerce.number().int().min(1),
        class_teacher: z.string().min(2).max(24)
    }),

});

export const classlistSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1),
        pagesize: z.coerce.number().int().min(1),
       searchquery:z.string().optional()
    }),

});

export const updateclassSchema = z.object({
    params: z.object({
        id: z.string().min(1).max(24)
    }),

    body: z.object({
        class_name: z.string().min(2),
        section: z.string().min(1),
        max_students: z.number().min(1),
        class_teacher: z.string().min(2).max(24)
    }),
});

export const deleteclassSchema = z.object({
    params: z.object({
        id: z.string().min(1).max(24)
    })
});
