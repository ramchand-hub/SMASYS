import { Router } from "express";
import studentRoutes from "./studentRoutes";
import teacherRoutes from "./teacherRoutes";
import authRoutes from "./authRoutes";
const router = Router();

router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/auth', authRoutes);
export default router;