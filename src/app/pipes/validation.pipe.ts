import {
    ArgumentMetadata,
    UnprocessableEntityException,
    ValidationPipe,
  } from '@nestjs/common';
  import { ValidationError } from 'class-validator';
  
  export class ClassValidationPipe extends ValidationPipe {
    constructor() {
      super({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors: ValidationError[]) => {
          function reducer(errors: ValidationError[], prefix?: string) {
            return errors.reduce(function (e, x) {
              if (x.constraints) {
                let m = x.constraints[Object.keys(x.constraints)[0]];
                m = (m.charAt(0).toLocaleUpperCase() + m.slice(1))
                  .split(/(?=[A-Z])| /)
                  .join(' ');
                if (prefix) {
                  return { ...e, [`${prefix}.${x.property}`]: m };
                } else {
                  return { ...e, [x.property]: m };
                }
              } else if (x.children) {
                return { ...e, ...reducer(x.children, x.property) };
              } else {
                return e;
              }
            }, {});
          }
          return new UnprocessableEntityException({
            message: 'The requested data was not processable',
            error: 'Unprocessable Entity',
            status: 422,
            errors: reducer(errors),
          });
        },
      });
    }
  
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
      return super.transform(value, metadata);
    }
  }
  