import jwt from 'jsonwebtoken';
import { IUser } from '../models/interfaces/IUser';
const config = require(`../../config/default.json`);

class AuthService {
  private secretKey: string;

  constructor() {
    // Replace 'your_secret_key' with a strong secret key
    this.secretKey = config.secretKey;
  }

  generateToken(user: IUser) {
    return jwt.sign(user, this.secretKey);
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      return null;
    }
  }
}

export const authService = new AuthService();
