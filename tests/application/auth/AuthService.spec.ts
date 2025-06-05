import { AuthService } from '../../../src/application/auth/AuthService';
import { UserAlreadyExistsException } from '../../../src/domain/user/exceptions/UserAlreadyExistsException';

describe('AuthService', () => {
  it('should throw UserAlreadyExistsException if user already exists', async () => {
    const fakeRepo = {
      findByEmail: async () => ({ email: 'test@example.com', password: 'pass' }),
      create: jest.fn()
    };
    const service = new AuthService(fakeRepo as any);
    await expect(service.register('test@example.com', 'pass')).rejects.toBeInstanceOf(UserAlreadyExistsException);
  });

  it('should create a new user if user does not exist', async () => {
    const fakeRepo = {
      findByEmail: async () => null,
      create: jest.fn(async (user) => ({ ...user, id: 'generated-id' }))
    };
    const service = new AuthService(fakeRepo as any);
    const result = await service.register('new@example.com', 'pass');
    expect(result).toEqual({ email: 'new@example.com', password: 'pass', id: 'generated-id' });
    expect(fakeRepo.create).toHaveBeenCalledWith({ email: 'new@example.com', password: 'pass' });
  });
});