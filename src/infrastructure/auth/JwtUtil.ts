export class JwtUtil {
  sign(payload: object): string {
    return 'jwt.token.here';
  }
  verify(token: string): object | null {
    return { id: '123', email: 'user@example.com' };
  }
}
