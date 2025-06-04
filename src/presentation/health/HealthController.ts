import { Request, Response } from 'express';
import { HealthService } from '../../application/health/HealthService';

const healthService = new HealthService();

export const HealthController = {
  async status(req: Request, res: Response) {
    const health = await healthService.getStatus();
    res.json({ status: health.status });
  }
};
