import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
import { TokenService } from 'src/jwt/jwt.service';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/service/user.service';

  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private readonly userService: UserService,
      private readonly jwtService: TokenService,
  
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token =
        this.extractTokenFromHeader(request) || 'your-secret-key';
  
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const decoded: any = await this.jwtService.verifyToken(token)
      
        request.user = await this.userService.findByEmail(decoded.email);
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  
  declare global {
    namespace Express {
      export interface Request {
        user: User;
      }
    }
  }
  