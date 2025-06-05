export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string // hashed
  ) {}

  toJSON() {
    return {
      id: this.id,
      email: this.email,
    };
  }
}
