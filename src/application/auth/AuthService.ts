import { UserAlreadyExistsException } from "../../domain/user/exceptions/UserAlreadyExistsException";
import { UserRepository } from "../../domain/user/UserRepository";

export class AuthService {
  constructor(private userRepository: UserRepository) { }

  async register(email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new UserAlreadyExistsException();
    return this.userRepository.create({ email, password });
  }

  // async login(email: string, password: string) {
  //   const user = await this.userRepository.findByEmail(email);
  //   if (!user || user.password !== password) throw new Error('Invalid credentials');
  //   return { token: 'jwt.token.here', user };
  // }

  // async me(userId: string) {
  //   return this.userRepository.findById(userId);
  // }
}
