import { Router } from 'express';
import { AuthController } from './AuthController';
import { validateBody } from '../common/middleware/validateBody';
import { loginSchema, registerSchema } from './schemas/authSchemas';

const router = Router();

router.post('/register', validateBody(registerSchema), AuthController.register);
router.post('/login', validateBody(loginSchema), AuthController.login);
router.get('/me', AuthController.me);

export default router;
