import { Router } from "express";
import student_controller from "../controllers/student_controller"
import { verifyToken } from "../utils/messages/verify_token";
const router = Router();

router.post("/createStudent", verifyToken, student_controller)
router.get("/getStudentsList", verifyToken, student_controller)

export default router