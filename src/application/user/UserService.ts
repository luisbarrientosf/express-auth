import { UserRepository } from '../../domain/user/UserRepository';
import { User } from '../../domain/user/User';
import { UserNotFoundException } from '../../domain/user/exceptions/UserNotFoundException';

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
}
