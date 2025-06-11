import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { UserRepositoryImpl } from '../../infrastructure/user/UserRepositoryImpl';
import { UserService } from '../../application/user/UserService';
import { UserNotFoundException } from '../../domain/user/exceptions/UserNotFoundException';
import { UserAlreadyExistsException } from '@domain/user/exceptions/UserAlreadyExistsException';
import { UserFilterParams, UserPaginationParams } from '@domain/user/UserRepository';

export const UserController = {
  async create(req: Request, res: Response) {
    try {
      const userRepo = new UserRepositoryImpl();
      const userService = new UserService(userRepo);
      const user = await userService.create(req.body);
      res.status(httpStatus.CREATED).json(user.toJSON());
    } catch (error) {
      if (error instanceof UserAlreadyExistsException) {
        return res.status(httpStatus.CONFLICT).json({ message: error.message });
      }
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const userRepo = new UserRepositoryImpl();
      const userService = new UserService(userRepo);
      const user = await userService.findById(req.params.id);
      res.status(httpStatus.OK).json(user.toJSON());
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return res.status(httpStatus.NOT_FOUND).json({ message: error.message });
      }
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const userRepo = new UserRepositoryImpl();
      const userService = new UserService(userRepo);
      const user = await userService.update(req.params.id, req.body);
      res.status(httpStatus.OK).json(user.toJSON());
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return res.status(httpStatus.NOT_FOUND).json({ message: error.message });
      }
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const userRepo = new UserRepositoryImpl();
      const userService = new UserService(userRepo);
      await userService.delete(req.params.id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return res.status(httpStatus.NOT_FOUND).json({ message: error.message });
      }
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const pagination: UserPaginationParams = { page: 1, pageSize: 10 };
      if (req.query.page) pagination.page = Number(req.query.page);
      if (req.query.pageSize) pagination.pageSize = Number(req.query.pageSize);

      const filters: UserFilterParams = {};
      if (req.query.email) filters.email = String(req.query.email);

      const userRepo = new UserRepositoryImpl();
      const userService = new UserService(userRepo);
      const users = await userService.findAll(pagination, filters);
      res.status(httpStatus.OK).json(users.map(u => u.toJSON()));
    } catch (error) {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }
};
