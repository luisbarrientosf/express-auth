export class InvalidJWTTokenException extends Error {
  constructor(message: string = 'Invalid JWT token') {
    super(message);
    this.name = 'InvalidJWTTokenException';
    Object.setPrototypeOf(this, InvalidJWTTokenException.prototype);
  }
}