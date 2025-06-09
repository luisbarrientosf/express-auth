import { Router } from 'express';
import { UserController } from './UserController';
import { validateParams } from '../common/middleware/validateParams';
import { validateBody } from '../common/middleware/validateBody';
import { getByIdSchema, updateUserSchema } from './schemas/userSchemas';

const router = Router();
router.get('/:id', validateParams(getByIdSchema), UserController.getById);
router.put('/:id', validateParams(getByIdSchema), validateBody(updateUserSchema), UserController.update);

export default router;
