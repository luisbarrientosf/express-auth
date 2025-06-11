import { UserRepository } from '@domain/user/UserRepository';
import { User } from '@domain/user/User';
import { UserNotFoundException } from '@domain/user/exceptions/UserNotFoundException';
import { UserAlreadyExistsException } from '@domain/user/exceptions/UserAlreadyExistsException';
import { UserCreateDto } from '@infrastructure/user/dto/UserCreateDto';

export class UserService {
  constructor(private userRepository: UserRepository) { }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async create(data: UserCreateDto): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) throw new UserAlreadyExistsException();
    return this.userRepository.create(data);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    await this.findById(id); // Ensure user exists
    return await this.userRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // Ensure user exists
    await this.userRepository.delete(id);
  }
}
