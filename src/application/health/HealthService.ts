import { HealthStatus } from '../../domain/health/HealthStatus';

export class HealthService {
  async getStatus(): Promise<HealthStatus> {
    return new HealthStatus('ok');
  }
}
