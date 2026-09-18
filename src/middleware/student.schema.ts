import z from "zod"

export const createStudentSchema = z.object({
    body: z.object({
        first_name: z.string().min(2),
        last_name: z.string().min(2),
        class: z.string().min(2),
        rollno: z.string().min(2),
        dob: z.string(),
        gender: z.string(),
        address: z.string().optional(),
    }),

});

export const getstudentlistschema = z.object({
    query: z.object({
           page: z.coerce.number().int().min(1),
           pagesize: z.coerce.number().int().min(1).max(100)
    }),

});

export const updateStudentSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),

 body: z.object({
        first_name: z.string().min(2),
        last_name: z.string().min(2),
        class: z.string().min(2),
        rollno: z.string().min(2),
        dob: z.string(),
        gender: z.string(),
        address: z.string().optional(),
    }),

 
});

export const deleteStudentschema = z.object({
   params: z.object({
    id: z.string().min(1).max(24),
  }),
});