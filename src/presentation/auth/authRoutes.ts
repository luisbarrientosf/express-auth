import { Router } from 'express';
import { AuthController } from './AuthController';
import { validateBody } from '../common/middleware/validateBody';
import { loginSchema } from './schemas/authSchemas';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', validateBody(loginSchema), AuthController.login);
router.get('/me', AuthController.me);

export default router;
