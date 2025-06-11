import { UserRepositoryImpl } from '../../../src/infrastructure/user/UserRepositoryImpl';
import { UserCreateDto } from '../../../src/infrastructure/user/dto/UserCreateDto';
import { StartedTestContainer } from 'testcontainers';
import { setupTestPostgres } from '../../_helpers/setupPostgreSQLContainer';

let container: StartedTestContainer;
let repo: UserRepositoryImpl;

describe('UserRepositoryImpl', () => {
  beforeAll(async () => {
    container = (await setupTestPostgres()).container;
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

  it('should find a user by id', async () => {
    const userCreateDto: UserCreateDto = {
      email: 'findbyid@example.com',
      password: 'findbyidpass'
    };
    const created = await repo.create(userCreateDto);
    const found = await repo.findById(created.id);
    expect(found).not.toBeNull();
    expect(found?.id).toBe(created.id);
    expect(found?.email).toBe('findbyid@example.com');
  });

  it('should update a user', async () => {
    const userCreateDto: UserCreateDto = {
      email: 'updateuser@example.com',
      password: 'oldpass'
    };
    const created = await repo.create(userCreateDto);
    const updated = await repo.update(created.id, { email: 'updateduser@example.com', password: 'newpass' });
    expect(updated.email).toBe('updateduser@example.com');
    expect(updated.password).toBe('newpass');
    expect(updated.id).toBe(created.id);
  });

  it('should return null for non-existent user', async () => {
    const found = await repo.findById('non-existent-id');
    expect(found).toBeNull();
  });

});
