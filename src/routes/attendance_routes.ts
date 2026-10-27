import Router from "express"
import { verifyToken } from "../utils/messages/verify_token"
import attendance_controller from "../controllers/attendance_controller"
const router = Router()
router.post("/createAttendance", verifyToken, attendance_controller)
router.get("/AttendanceList", verifyToken, attendance_controller)

export default router