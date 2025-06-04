import { User } from '../../domain/user/User';
import { UserRepository } from '../../domain/user/UserRepository';

export class UserRepositoryImpl implements UserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
