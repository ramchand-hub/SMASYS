import { Router } from 'express';
import * as controller from '../controllers/teacherController';

const router = Router();

router.post('/createTeacher', controller.createTeacher);
router.get('/getTeachersList', controller.getTeachers);
router.get('/getTeacher/:id', controller.getTeacherById);
router.put('/updateTeacher/:id', controller.updateTeacher);
router.delete('/deleteTeacher/:id', controller.deleteTeacher);

export default router;
