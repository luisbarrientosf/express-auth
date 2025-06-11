import { UserCreateDto } from '../../infrastructure/user/dto/UserCreateDto';
import { User } from './User';

export interface UserPaginationParams {
  page: number;
  pageSize: number;
}

export interface UserFilterParams {
  email?: string;
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: UserCreateDto): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(pagination: UserPaginationParams, filters: UserFilterParams): Promise<User[]>;
  // findByIds(ids: string[]): Promise<User[]>;
}
