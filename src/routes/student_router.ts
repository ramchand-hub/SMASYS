import { Router } from "express";
import student_controller from "../controllers/student_controller"
const router = Router();

router.post("/createStudent", student_controller)
router.get("/getStudentsList", student_controller)

export default router