import { UserRepositoryImpl } from '../../../src/infrastructure/user/UserRepositoryImpl';
import { UserCreateDto } from '../../../src/infrastructure/user/dto/UserCreateDto';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { execSync } from 'child_process';

let container: StartedTestContainer;
let repo: UserRepositoryImpl;

describe('UserRepositoryImpl', () => {
  beforeAll(async () => {
    container = await new GenericContainer('postgres')
      .withEnvironment({ 
        POSTGRES_USER: 'test', 
        POSTGRES_PASSWORD: 'test', 
        POSTGRES_DB: 'testdb' 
      })
      .withExposedPorts(5432)
      .start();

    const port = container.getMappedPort(5432);
    const host = container.getHost();
    const url = `postgresql://test:test@${host}:${port}/testdb`;
    process.env.DATABASE_URL = url;

    execSync('npx prisma migrate reset --force --skip-seed', {
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: url }
    });
    jest.resetModules();
    repo = new (require('../../../src/infrastructure/user/UserRepositoryImpl').UserRepositoryImpl)();
  });

  afterAll(async () => {
    await container.stop();
  });

  it('should create and retrieve a user by email', async () => {
    const userCreateDto: UserCreateDto = {
      email: 'infra-test@example.com',
      password: 'securepass'
    };
    const created = await repo.create(userCreateDto);
    expect(created.email).toBe('infra-test@example.com');
    expect(created.password).toBe('securepass');
    expect(created.id).toBeDefined();

    const found = await repo.findByEmail('infra-test@example.com');
    expect(found).not.toBeNull();
    expect(found?.email).toBe('infra-test@example.com');
  });
});
