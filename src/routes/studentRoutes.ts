import { Router } from 'express';
import * as controller from '../controllers/studentController';

const router = Router();

router.post('/createStudent', controller.createStudent);
router.get('/getStudentsList', controller.getStudents);
router.get('/getStudent/:id', controller.getStudentById);
router.put('/updateStudent/:id', controller.updateStudent);
router.delete('/deleteStudent/:id', controller.deleteStudent);
export default router;
