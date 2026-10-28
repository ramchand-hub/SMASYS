import Router from "express"
import { verifyToken } from "../utils/messages/verify_token"
import attendance_controller from "../controllers/attendance_controller"
import { createAttendanceSchema } from "../middleware/attendance.schema"
import validate from "../middleware/validation"
const router = Router()
router.post("/createAttendance", verifyToken, validate(createAttendanceSchema),attendance_controller)
router.get("/AttendanceList", verifyToken, attendance_controller)

export default router