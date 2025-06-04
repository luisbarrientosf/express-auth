import { Router } from 'express';
import { HealthController } from './HealthController';

const router = Router();
router.get('/health', HealthController.status);
export default router;
