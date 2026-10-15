import Router from "express"
import * as controller from "../controllers/timetableController"
const router = Router()
router.post("/createTimetable", controller.createTimetable)
router.get("/timetablesList", controller.timetablelist)
export default router