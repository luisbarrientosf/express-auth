import { UserService } from '../../../src/application/user/UserService';
import { UserRepository } from '../../../src/domain/user/UserRepository';
import { User } from '../../../src/domain/user/User';
import { UserNotFoundException } from '../../../src/domain/user/exceptions/UserNotFoundException';

const mockUser: User = new User('1', 'test@example.com', 'password');

class MockUserRepository implements UserRepository {
  findById = jest.fn(async (id: string) => (id === '1' ? mockUser : null));
  findByEmail = jest.fn(async (email: string) => (email === 'test@example.com' ? mockUser : null));
  create = jest.fn();
}

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    userService = new UserService(userRepository);
  });

  it('should find user by id', async () => {
    const user = await userService.findById('1');
    expect(user).toEqual(mockUser);
    expect(userRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should throw UserNotFoundException if user not found by id', async () => {
    await expect(userService.findById('2')).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it('should find user by email', async () => {
    const user = await userService.findByEmail('test@example.com');
    expect(user).toEqual(mockUser);
    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('should throw UserNotFoundException if user not found by email', async () => {
    await expect(userService.findByEmail('notfound@example.com')).rejects.toBeInstanceOf(UserNotFoundException);
  });
});
