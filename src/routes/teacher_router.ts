import { Router } from "express";
import teacher_controller from "../controllers/teacher_controller"
const router = Router();

router.post("/createTeacher", teacher_controller)
router.get("/getTeachersList", teacher_controller)

export default router