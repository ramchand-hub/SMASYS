import { Router } from "express";
import auth_router from "./auth_router";
export const routes = Router()

routes.use("/auth",auth_router)