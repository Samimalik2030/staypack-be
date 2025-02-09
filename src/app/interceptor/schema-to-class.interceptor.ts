import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { classToPlain } from 'class-transformer';
  
  function callToObject(item) {
    if (item && item.toObject) {
      return classToPlain(item.toObject());
    } else if (Array.isArray(item)) {
      return item.map(callToObject);
    } else if (typeof item === 'object' && item !== null) {
      const transformedObject = {};
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          transformedObject[key] = callToObject(item[key]);
        }
      }
      return transformedObject;
    }
    return item;
  }
  
  @Injectable()
  export class SchemaToClassInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          return callToObject(data);
        }),
      );
    }
  }
  