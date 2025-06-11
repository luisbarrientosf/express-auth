import { InvalidCredentialsException } from "../../domain/auth/exceptions/InvalidCredentialsException";
import { UserAlreadyExistsException } from "../../domain/user/exceptions/UserAlreadyExistsException";
import { User } from "../../domain/user/User";
import { UserRepository } from "../../domain/user/UserRepository";
import { JwtUtil } from "../../infrastructure/auth/JwtUtil";

export class AuthService {
  constructor(private userRepository: UserRepository) { }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.password !== password) throw new InvalidCredentialsException();
    const token = JwtUtil.sign({ userId: user.id, email: user.email });
    return token;
  }
}
