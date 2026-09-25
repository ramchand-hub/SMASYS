import Router from "express"
import * as controller from "../controllers/classController"
const routes = Router()

routes.post('/createClass', controller.createClass);
routes.get('/getclassesList', controller.getclasseslist);
routes.put('/updateclass/:id', controller.updateClass);
routes.delete('/deleteclass/:id', controller.deleteClass);
export default routes