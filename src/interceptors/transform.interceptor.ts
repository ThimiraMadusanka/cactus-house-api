import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ArgumentsHost,
} from '@nestjs/common';
import { isObject, snakeCase, camelCase } from 'lodash';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ArgumentsHost, next: CallHandler): Observable<any> {
    const [req] = context.getArgs();

    // Convert request body to camel case
    req.body = this.toCamelCaseRecursive(req.body);

    return next.handle().pipe(
      map((data) => {
        // Convert response to snake case
        const transformedData = this.toSnakeCaseRecursive(data);
        return transformedData;
      }),
    );
  }

  // Convert to camel case
  private toCamelCaseRecursive(value: any): any {
    if (Array.isArray(value)) {
      return value.map((item) => this.toCamelCaseRecursive(item));
    } else if (isObject(value)) {
      if (value instanceof Date) {
        return value;
      } else {
        return Object.keys(value).reduce(
          (acc, key) => {
            const newKey = camelCase(key);
            acc[newKey] = this.toCamelCaseRecursive(value[key]);
            return acc;
          },
          {} as Record<string, any>,
        );
      }
    } else {
      return value;
    }
  }

  // Convert to snake case
  private toSnakeCaseRecursive(value: any): any {
    if (Array.isArray(value)) {
      return value.map((item) => this.toSnakeCaseRecursive(item));
    } else if (isObject(value)) {
      if (value instanceof Date) {
        return value;
      } else {
        return Object.keys(value).reduce(
          (acc, key) => {
            const newKey = snakeCase(key);
            acc[newKey] = this.toSnakeCaseRecursive(value[key]);
            return acc;
          },
          {} as Record<string, any>,
        );
      }
    } else {
      return value;
    }
  }
}
