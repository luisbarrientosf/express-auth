import { User } from '../../domain/user/User';
import { UserRepository } from '../../domain/user/UserRepository';
import prisma from '../common/prisma'; // Adjust the import path as necessary
import { UserCreateDto } from './dto/UserCreateDto';

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.id, user.email, user.password);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(user.id, user.email, user.password);
  }

  async create(user: UserCreateDto): Promise<User> {
    const created = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
      },
    });
    return new User(created.id, created.email, created.password);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        password: data.password,
      },
    });
    return new User(updated.id, updated.email, updated.password);
  }
}
