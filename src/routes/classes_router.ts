import Router from "express"
import class_controller from "../controllers/class_controller"
import { verifyToken } from "../utils/messages/verify_token"
import validate from "../middleware/validation"
import { classlistSchema, createClassSchema, deleteclassSchema, updateclassSchema } from "../middleware/class.schema"
const route = Router()

route.post("/createClass", verifyToken, validate(createClassSchema), class_controller)
route.get("/getclassesList", verifyToken, validate(classlistSchema), class_controller)
route.put("/updateclass/:id", verifyToken, validate(updateclassSchema),class_controller)
route.delete("/deleteclass/:id", verifyToken, validate(deleteclassSchema), class_controller)
route.get("/getTeacheroption", verifyToken, class_controller)

export default route