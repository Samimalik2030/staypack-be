import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  generateToken(payload: object): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    const issuer = this.configService.get<string>('JWT_ISSUER');
    const audience = this.configService.get<string>('JWT_AUDIENCE');

    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    return this.jwtService.sign(payload, {
      secret,
      expiresIn: '1d', // Token expiration
      issuer: issuer || undefined, // Ensure issuer is a string
      audience: audience || undefined, // Ensure audience is a string
    });
  }

  verifyToken(token: string): any {
    const secret = this.configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    return this.jwtService.verify(token, { secret });
  }
}
