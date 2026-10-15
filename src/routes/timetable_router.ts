import Router from "express"
import { verifyToken } from "../utils/messages/verify_token"
import Timetable_controller from "../controllers/Timetable_controller"
const router = Router()
router.post("/createTimetable", verifyToken, Timetable_controller)
router.get("/timetablesList", verifyToken, Timetable_controller)

export default router