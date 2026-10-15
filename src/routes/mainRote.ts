import { Router } from "express";
import teacherRoutes from "./teacherRoutes";
import classRoutes from "./classRoutes"
import timetableRoutes from "./timetableRoute"
const router = Router();

router.use('/teachers', teacherRoutes);
router.use('/classes', classRoutes);
router.use('/timetables', timetableRoutes);
export default router;