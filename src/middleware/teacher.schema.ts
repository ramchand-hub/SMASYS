import { z } from "zod";

export const createTeacherSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    mail: z.string().email(),
    contact: z.string().min(10),
    subject: z.string().min(2),
    gender: z.string(),
    qualification: z.string().optional(),
    address: z.string().optional(),
  }),

});

export const Teacherslistschema = z.object({
   query: z.object({
    page: z.coerce.number().int().min(1),
    pagesize: z.coerce.number().int().min(1).max(100),
  }),
});

export const updateTeacherSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),

  body: z.object({
    name: z.string().min(2).optional(),
    mail: z.string().email().optional(),
    contact: z.string().min(10).optional(),
    subject: z.string().optional(),
    gender: z.string().optional(),
    qualification: z.string().optional(),
    address: z.string().optional(),
  }),

 
});

export const deleteTeacherschema = z.object({
   params: z.object({
    id: z.string().min(1),
  }),
});