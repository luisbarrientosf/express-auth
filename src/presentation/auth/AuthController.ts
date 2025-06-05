import { Request, Response } from 'express';
import { AuthService } from '../../application/auth/AuthService';
import { UserRepositoryImpl } from '../../infrastructure/user/UserRepositoryImpl';
import { UserAlreadyExistsException } from '../../domain/user/exceptions/UserAlreadyExistsException';
import httpStatus from 'http-status';

const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const  { email, password } = req.body;
      const userRepo = new UserRepositoryImpl();
      const authService = new AuthService(userRepo);
      const user = await authService.register(email, password);
      
      res.status(httpStatus.CREATED).json(user.toJSON());
    } catch (error) {
      if (error instanceof UserAlreadyExistsException) {
        res.status(httpStatus.CONFLICT).json(error.message);
      } else {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
          message: 'Internal server error' 
        });
      }
    }
  },
  async login(req: Request, res: Response) {
    res.status(httpStatus.OK).json({ token: 'jwt.token.here', user: { id: '123', email: req.body.email } });
  },
  async me(req: Request, res: Response) {
    res.status(httpStatus.OK).json({ id: '123', email: 'user@example.com' });
  },
};

export default AuthController;
