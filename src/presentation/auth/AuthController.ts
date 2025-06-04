import { Request, Response } from 'express';

const AuthController = {
  async register(req: Request, res: Response) {
    res.status(201).json({ message: 'User registered (mock)', userId: '123' });
  },
  async login(req: Request, res: Response) {
    res.status(200).json({ token: 'jwt.token.here', user: { id: '123', email: req.body.email } });
  },
  async me(req: Request, res: Response) {
    res.status(200).json({ id: '123', email: 'user@example.com' });
  },
};

export default AuthController;
