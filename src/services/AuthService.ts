import jwt from 'jsonwebtoken';
import { variables } from '../dotenv';

export class AuthService {
  static generateTokens() {
    const accessToken = this.generateAccessToken('userId');
    const refreshToken = this.generateRefreshToken('userId');

    return { accessToken, refreshToken };
  }

  static generateAccessToken(userId: string) {
    return jwt.sign({ userId }, variables.JWT_ACCESS_SECRET as string, {
      expiresIn: variables.JWT_REFRESH_EXPIRATION as string,
    });
  }

  static generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, variables.JWT_REFRESH_SECRET as string, {
      expiresIn: variables.JWT_REFRESH_EXPIRATION as string,
    });
  }

  static verifyAccessToken(token: string) {
    return jwt.verify(token, variables.JWT_ACCESS_SECRET as string);
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, variables.JWT_REFRESH_SECRET as string);
  }

  static decodeAccessToken(token: string) {
    return jwt.decode(token);
  }

  static decodeRefreshToken(token: string) {
    return jwt.decode(token);
  }
}
