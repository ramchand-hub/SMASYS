import Router from "express"
import { verifyToken } from "../utils/messages/verify_token"
import Timetable_controller from "../controllers/Timetable_controller"
import validate from "../middleware/validation"
import { createtimetableSchema,timetablelistSchema } from "../middleware/timetable.schema"
const router = Router()
router.post("/createTimetable", verifyToken, validate(createtimetableSchema), Timetable_controller)
router.get("/timetablesList", verifyToken, validate(timetablelistSchema), Timetable_controller)

export default router