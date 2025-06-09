import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { AuthService } from '@application/auth/AuthService';
import { UserRepositoryImpl } from '@infrastructure/user/UserRepositoryImpl';
import { UserAlreadyExistsException } from '@domain/user/exceptions/UserAlreadyExistsException';
import { InvalidCredentialsException } from '@domain/auth/exceptions/InvalidCredentialsException';
import { UserService } from '@application/user/UserService';
import { JwtUtil } from '@infrastructure/auth/JwtUtil';

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userRepo = new UserRepositoryImpl();
      const authService = new AuthService(userRepo);
      const token = await authService.login(email, password);

      res.status(httpStatus.OK).json({ token });
    } catch (error) {
      if (error instanceof InvalidCredentialsException) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userRepo = new UserRepositoryImpl();
      const authService = new UserService(userRepo);
      const user = await authService.create({ email, password });

      res.status(httpStatus.CREATED).json(user.toJSON());
    } catch (error) {
      if (error instanceof UserAlreadyExistsException) {
        res.status(httpStatus.CONFLICT).json({ message: error.message });
      } else {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  },
  async me(req: Request, res: Response) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Missing or invalid Authorization header' });
      }
      const token = authHeader.split(' ')[1];
      const payload = JwtUtil.verify(token);
      if (!payload) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
      }
      res.status(httpStatus.OK).json(payload);
    } catch {
      res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
    }
  },
};