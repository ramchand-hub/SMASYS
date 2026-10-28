import Router from "express"
import * as controller from "../controllers/attendanceController"
const router = Router()
router.post("/createAttendance", controller.create_attendance)
// router.get("/timetablesList", controller.timetablelist)
export default router