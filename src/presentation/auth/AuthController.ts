import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { AuthService } from '@application/auth/AuthService';
import { UserRepositoryImpl } from '@infrastructure/user/UserRepositoryImpl';
import { UserAlreadyExistsException } from '@domain/user/exceptions/UserAlreadyExistsException';
import { InvalidCredentialsException } from '@domain/auth/exceptions/InvalidCredentialsException';
import { UserService } from '@application/user/UserService';
import { InvalidJWTTokenException } from '@infrastructure/auth/exceptions/InvalidJWTTokenException';

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userRepo = new UserRepositoryImpl();
      const authService = new AuthService(userRepo);
      const tokens = await authService.login(email, password);

      res.status(httpStatus.OK).json({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      });
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
        return res.status(httpStatus.CONFLICT).json({ message: error.message });
      }
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  async me(req: Request, res: Response) {
    try {
      const authHeader = req.headers['authorization'] as string;
      const token = authHeader.split(' ')[1];
      const userRepo = new UserRepositoryImpl();
      const authService = new AuthService(userRepo);
      const payload = authService.verify(token);
      res.status(httpStatus.OK).json(payload);
    } catch (error) {
      if (error instanceof InvalidJWTTokenException) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      console.error(error);
      res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
    }
  },

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const userRepo = new UserRepositoryImpl();
      const authService = new AuthService(userRepo);
      const tokens = await authService.refresh(refreshToken);
      res.status(httpStatus.OK).json({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      });
    } catch (error) {
      if (error instanceof InvalidJWTTokenException) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
      }
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
};