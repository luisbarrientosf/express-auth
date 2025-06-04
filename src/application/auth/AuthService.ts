export class AuthService {
  async register(email: string, password: string) {
    return { userId: '123' };
  }
  async login(email: string, password: string) {
    return { token: 'jwt.token.here', user: { id: '123', email } };
  }
  async me(userId: string) {
    return { id: userId, email: 'user@example.com' };
  }
}
