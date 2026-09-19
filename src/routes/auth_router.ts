import auth_controller from "../controllers/auth_controller"
import { Router } from "express"
import validate from "../middleware/validation";
import { loginSchema, registerSchema } from "../middleware/auth.schema";
const router = Router()


router.post("/login",validate(loginSchema),auth_controller);
router.post("/register",validate(registerSchema),auth_controller);
router.post("/forgot-password",auth_controller);
router.post("/update-password",auth_controller);
router.post("/uploadfile",auth_controller);
router.get("/downloadfile/:id",auth_controller);

export default router