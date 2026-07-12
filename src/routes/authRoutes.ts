import { Router } from 'express';
import { forgot_password, login, register, update_password, upload_file, } from '../controllers/authController';
import { createRole, getRoles } from '../controllers/roleController';

const router = Router();

router.post('/login', login);
router.post('/add_role', createRole)
router.get('/get_roles', getRoles)
router.post('/register', register);
router.post('/forgot-password', forgot_password);
router.post('/update-password', update_password);
router.post("/uploadfile",upload_file)

export default router;
