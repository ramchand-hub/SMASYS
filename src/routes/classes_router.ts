import Router from "express"
import class_controller from "../controllers/class_controller"
import { verifyToken } from "../utils/messages/verify_token"
const route = Router()

route.post("/createClass", verifyToken, class_controller)
route.get("/getclassesList", verifyToken, class_controller)
route.put("/updateclass/:id", verifyToken, class_controller)
route.delete("/deleteclass/:id", verifyToken, class_controller)

export default route