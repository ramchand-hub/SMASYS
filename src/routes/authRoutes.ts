import { Router } from 'express';
import { login, } from '../controllers/authController';
import { createRole, getRoles } from '../controllers/roleController';
import { registerUser } from '../controllers/userController';

const router = Router();

router.post('/login', login);
router.post('/add_role', createRole)
router.get('/get_roles', getRoles)
router.post('/user_register', registerUser);

export default router;
