import { GenericContainer } from 'testcontainers';
import { execSync } from 'child_process';

export async function setupTestPostgres(envVars: Record<string, string> = {}) {
  const container = await new GenericContainer('postgres')
    .withEnvironment({
      POSTGRES_USER: 'test',
      POSTGRES_PASSWORD: 'test',
      POSTGRES_DB: 'testdb',
      ...envVars,
    })
    .withExposedPorts(5432)
    .start();

  const port = container.getMappedPort(5432);
  const host = container.getHost();

  const url = `postgresql://test:test@${host}:${port}/testdb`;
  process.env.DATABASE_URL = url;

  execSync('npx prisma migrate reset --force --skip-seed', {
    stdio: 'inherit',
    env: { ...process.env },
  });
  jest.resetModules();

  return { container, url };
}