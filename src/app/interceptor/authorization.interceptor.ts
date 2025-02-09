import {
    CallHandler,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class AuthorizationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      request.authorize = async (can: (() => Promise<boolean>) | boolean) => {
        if (typeof can === 'function') {
          const result = await (can as () => Promise<boolean>)();
          if (!result)
            throw new ForbiddenException(
              'You are not allowed to access this resource.',
            );
        } else {
          const allowed = await can;
          if (!allowed)
            throw new ForbiddenException(
              'You are not allowed to access this resource.',
            );
        }
      };
      return next.handle();
    }
  }
  
  declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
      interface Request {
        authorize(
          can: (() => Promise<boolean>) | boolean | Promise<boolean>,
        ): Promise<void>;
      }
    }
  }
  