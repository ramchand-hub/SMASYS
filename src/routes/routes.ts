import { Router } from "express";
import auth_router from "./auth_router";
import student_router from "./student_router"
import teacher_router from "./teacher_router"
export const routes = Router()

routes.use("/auth",auth_router)
routes.use("/students",student_router)
routes.use("/teachers",teacher_router)