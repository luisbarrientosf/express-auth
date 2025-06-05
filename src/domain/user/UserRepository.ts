import { UserCreateDto } from '../../infrastructure/user/dto/UserCreateDto';
import { User } from './User';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: UserCreateDto): Promise<User>;
  // findById(id: string): Promise<User | null>;
  // update(user: User): Promise<User>;
  // delete(id: string): Promise<void>;
  // findAll(): Promise<User[]>;
  // findByIds(ids: string[]): Promise<User[]>;
}
