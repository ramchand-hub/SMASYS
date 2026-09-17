import { Router } from "express";
import teacher_controller from "../controllers/teacher_controller"
import { verifyToken } from "../utils/messages/verify_token";
import validate from "../middleware/validation"
import { createTeacherSchema } from "../middleware/teacher.schema";
import { Teacherslistschema } from "../middleware/teacher.schema";
import { updateTeacherSchema } from "../middleware/teacher.schema";
import { deleteTeacherschema } from "../middleware/teacher.schema";
const router = Router();

router.post("/createTeacher", verifyToken, validate(createTeacherSchema),teacher_controller)
router.get("/getTeachersList",verifyToken, validate(Teacherslistschema),teacher_controller)
router.put("/updateTeacher/:id", verifyToken, validate(updateTeacherSchema),teacher_controller)
router.delete("/deleteTeacher/:id", verifyToken, validate(deleteTeacherschema),teacher_controller)

export default router