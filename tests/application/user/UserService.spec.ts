import { UserService } from '../../../src/application/user/UserService';
import { UserRepository } from '../../../src/domain/user/UserRepository';
import { User } from '../../../src/domain/user/User';
import { UserNotFoundException } from '../../../src/domain/user/exceptions/UserNotFoundException';

const mockUser = new User('1', 'test@example.com', 'password');

class MockUserRepository implements UserRepository {
  findById = jest.fn();
  findByEmail = jest.fn();
  create = jest.fn();
  update = jest.fn();
  delete = jest.fn();
}

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    userService = new UserService(userRepository);
  });

  it('should find user by id', async () => {
    userRepository.findById = jest.fn(async () => mockUser) as any;
    const user = await userService.findById('1');
    expect(user).toEqual(mockUser);
    expect(userRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should throw UserNotFoundException if user not found by id', async () => {
    userRepository.findById = jest.fn(async () => null) as any;
    await expect(userService.findById('2')).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it('should find user by email', async () => {
    userRepository.findByEmail = jest.fn(async () => mockUser) as any;
    const user = await userService.findByEmail('test@example.com');
    expect(user).toEqual(mockUser);
    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('should throw UserNotFoundException if user not found by email', async () => {
    userRepository.findByEmail = jest.fn(async () => null) as any;
    await expect(userService.findByEmail('notfound@example.com')).rejects.toBeInstanceOf(UserNotFoundException);
  });

  it('should create a new user if not exists', async () => {
    userRepository.findByEmail = jest.fn(async () => null) as any;
    userRepository.create = jest.fn(async (dto) => new User('2', dto.email, dto.password));
    const user = await userService.create({ email: 'newuser@example.com', password: 'pass' });
    expect(user.email).toBe('newuser@example.com');
    expect(userRepository.create).toHaveBeenCalledWith({ email: 'newuser@example.com', password: 'pass' });
  });

  it('should throw UserAlreadyExistsException if user exists on create', async () => {
    userRepository.findByEmail = jest.fn(async () => mockUser) as any;
    await expect(userService.create({ email: 'test@example.com', password: 'pass' }))
      .rejects.toThrow('User already exists');
  });

  it('should update a user', async () => {
    userRepository.findById = jest.fn(async () => mockUser) as any;
    userRepository.update = jest.fn(async (id, data) => new User(id, data.email!, data.password!));
    const updated = await userService.update('1', { email: 'updated@example.com', password: 'newpass' });
    expect(updated.email).toBe('updated@example.com');
    expect(updated.password).toBe('newpass');
    expect(userRepository.update).toHaveBeenCalledWith('1', { email: 'updated@example.com', password: 'newpass' });
  });

  it('should throw UserNotFoundException if update returns null', async () => {
    userRepository.update = jest.fn(async () => null);
    await expect(userService.update('notfound', { email: 'x', password: 'y' }))
      .rejects.toBeInstanceOf(UserNotFoundException);
  });

  it('should delete a user by id', async () => {
    userRepository.findById = jest.fn(async () => mockUser) as any;
    userRepository.delete = jest.fn(async () => { });
    await expect(userService.delete('1')).resolves.toBeUndefined();
    expect(userRepository.findById).toHaveBeenCalledWith('1');
    expect(userRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should throw UserNotFoundException if user does not exist on delete', async () => {
    userRepository.findById = jest.fn(async () => null) as any;
    userRepository.delete = jest.fn();
    await expect(userService.delete('notfound')).rejects.toBeInstanceOf(UserNotFoundException);
    expect(userRepository.findById).toHaveBeenCalledWith('notfound');
    expect(userRepository.delete).not.toHaveBeenCalled();
  });
});
