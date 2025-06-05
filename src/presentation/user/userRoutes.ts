import { Router } from 'express';
import { UserController } from './UserController';
import { validateParams } from '../common/middleware/validateParams';
import { getByIdSchema } from './schemas/userSchemas';

const router = Router();
router.get('/:id', validateParams(getByIdSchema), UserController.getById);

export default router;
