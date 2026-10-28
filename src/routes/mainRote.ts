import { Router } from "express";
import teacherRoutes from "./teacherRoutes";
import classRoutes from "./classRoutes"
import timetableRoutes from "./timetableRoute"
import attendanceRoutes from "./attendanceRoutes"
const router = Router();

router.use('/teachers', teacherRoutes);
router.use('/classes', classRoutes);
router.use('/timetables', timetableRoutes);
router.use('/attendance', attendanceRoutes);
export default router;