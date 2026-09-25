import { Router } from "express";
import teacherRoutes from "./teacherRoutes";
import classRoutes from "./classRoutes"
const router = Router();

router.use('/teachers', teacherRoutes);
router.use('/classes', classRoutes);
export default router;