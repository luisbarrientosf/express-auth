import { UserCreateDto } from '../../infrastructure/user/dto/UserCreateDto';
import { User } from './User';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: UserCreateDto): Promise<User>;
  // update(user: User): Promise<User>;
  // delete(id: string): Promise<void>;
  // findAll(): Promise<User[]>;
  // findByIds(ids: string[]): Promise<User[]>;
}
