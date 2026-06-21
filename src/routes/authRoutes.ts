import { Router } from 'express';
import { login, register, } from '../controllers/authController';
import { createRole, getRoles } from '../controllers/roleController';

const router = Router();

router.post('/login', login);
router.post('/add_role', createRole)
router.get('/get_roles', getRoles)
router.post('/register', register);

export default router;
