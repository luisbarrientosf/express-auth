import { UserNotFoundException } from "@domain/user/exceptions/UserNotFoundException";
import { InvalidCredentialsException } from "@domain/auth/exceptions/InvalidCredentialsException";
import { UserRepository } from "@domain/user/UserRepository";
import { JwtUtil } from "@infrastructure/auth/JwtUtil";
import { JWTAccessToken } from '@infrastructure/auth/types/Jwt.types';

export class AuthService {
  constructor(private userRepository: UserRepository) { }

  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.password !== password) throw new InvalidCredentialsException();
    const accessToken = JwtUtil.sign({ userId: user.id, email: user.email });
    const refreshToken = JwtUtil.signRefreshToken(user.id);
    return { accessToken, refreshToken };
  }

  async refresh(prevToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    let payload = JwtUtil.verifyRefreshToken(prevToken);

    const user = await this.userRepository.findById(payload.userId);
    if (!user) throw new UserNotFoundException();

    const accessToken = JwtUtil.sign({ userId: user.id, email: user.email });
    const refreshToken = JwtUtil.signRefreshToken(user.id);
    return { accessToken, refreshToken };
  }

  verify(token: string): JWTAccessToken {
    return JwtUtil.verify(token);
  }
}
