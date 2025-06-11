import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { UserRepositoryImpl } from '../../infrastructure/user/UserRepositoryImpl';
import { UserService } from '../../application/user/UserService';
import { UserNotFoundException } from '../../domain/user/exceptions/UserNotFoundException';

export const UserController = {
  async create(req: Request, res: Response) {
    try {
      const userRepo = new UserRepositoryImpl();
      const userService = new UserService(userRepo);
      const user = await userService.create(req.body);
      res.status(httpStatus.CREATED).json(user.toJSON());
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
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
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
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
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
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
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }
};
