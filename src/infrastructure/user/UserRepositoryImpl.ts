import prisma from '../common/prisma';
import { Prisma } from '../../../prisma/generated-client';
import { User } from '../../domain/user/User';
import { UserRepository, UserPaginationParams, UserFilterParams } from '../../domain/user/UserRepository';
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

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async findAll(pagination: UserPaginationParams, filters: UserFilterParams): Promise<User[]> {
    const { page, pageSize } = pagination;
    const { email } = filters;

    const where: Prisma.UserWhereInput = {};
    if (email) where.email = { contains: email, mode: 'insensitive' };

    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return users.map(u => new User(u.id, u.email, u.password));
  }
}
