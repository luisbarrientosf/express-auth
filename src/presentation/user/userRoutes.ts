import { Router } from 'express';
import { UserController } from './UserController';
import { validateParams } from '../common/middleware/validateParams';
import { validateBody } from '../common/middleware/validateBody';
import { createUserSchema, getByIdSchema, updateUserSchema } from './schemas/userSchemas';

const router = Router();
router.get('/:id', validateParams(getByIdSchema), UserController.getById);
router.post('/', validateBody(createUserSchema), UserController.create);
router.put('/:id', validateParams(getByIdSchema), validateBody(updateUserSchema), UserController.update);
router.delete('/:id', validateParams(getByIdSchema), UserController.delete);
router.get('/', UserController.list);

export default router;
