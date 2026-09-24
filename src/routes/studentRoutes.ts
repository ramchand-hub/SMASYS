import { Router } from 'express';
import * as controller from '../controllers/studentController';

const router = Router();

router.post('/createStudent', controller.createStudent);
router.get('/getStudentsList', controller.getStudents);
router.put('/updateStudent/:id', controller.updateStudent);
router.delete('/deleteStudent/:id', controller.deleteStudent);
export default router;
