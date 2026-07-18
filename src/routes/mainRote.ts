import { Router } from "express";
import teacherRoutes from "./teacherRoutes";
const router = Router();

router.use('/teachers', teacherRoutes);
export default router;