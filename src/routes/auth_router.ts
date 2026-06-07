import auth_controller from "../controllers/auth_controller"
import { Router } from "express"

const auth_router = Router()


auth_router.post("/login",auth_controller);

export default auth_router