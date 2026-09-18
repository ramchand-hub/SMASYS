import { Router } from "express";
import student_controller from "../controllers/student_controller"
import { verifyToken } from "../utils/messages/verify_token";
import validate from "../middleware/validation";
import { createStudentSchema } from "../middleware/student.schema";
import { getstudentlistschema } from "../middleware/student.schema";
import { updateStudentSchema } from "../middleware/student.schema";
import { deleteStudentschema } from "../middleware/student.schema";
const router = Router();

router.post("/createStudent", verifyToken, validate(createStudentSchema),student_controller)
router.get("/getStudentsList", verifyToken, validate(getstudentlistschema),student_controller)
router.put("/updateStudent/:id", verifyToken, validate(updateStudentSchema),student_controller)
router.delete("/deleteStudent/:id", verifyToken, validate(deleteStudentschema),student_controller)

export default router