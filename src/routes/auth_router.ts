import auth_controller from "../controllers/auth_controller"
import { Router } from "express"

const router = Router()


router.post("/login",auth_controller);
router.post("/register",auth_controller);
router.post("/forgot-password",auth_controller);
router.post("/update-password",auth_controller);
router.post("/uploadfile",auth_controller);

export default router