import { Router } from "express";
import teacher_controller from "../controllers/teacher_controller"
import { verifyToken } from "../utils/messages/verify_token";
const router = Router();

router.post("/createTeacher", verifyToken, teacher_controller)
router.get("/getTeachersList",verifyToken, teacher_controller)
router.put("/updateTeacher/:id", verifyToken,teacher_controller)
router.delete("/deleteTeacher/:id", verifyToken, teacher_controller)

export default router