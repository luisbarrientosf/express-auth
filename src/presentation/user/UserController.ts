import { Request, Response } from 'express';
import { UserRepositoryImpl } from '../../infrastructure/user/UserRepositoryImpl';
import { UserService } from '../../application/user/UserService';
import httpStatus from 'http-status';

export const UserController = {
  async getById(req: Request, res: Response) {
    try {
      const userRepo = new UserRepositoryImpl();
      const userService = new UserService(userRepo);
      const user = await userService.findById(req.params.id);
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
      }
      res.status(httpStatus.OK).json(user.toJSON());
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }
};
