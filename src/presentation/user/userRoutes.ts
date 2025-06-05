import { Router } from 'express';
import { UserController } from './UserController';

const router = Router();

router.get('/:id', UserController.getById);

export default router;
