import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class GlobalValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof HttpException) {
      if (exception.getResponse() instanceof Array && exception.getResponse()[0] instanceof ValidationError) {
        response.status(status).json({
          statusCode: status,
          message: 'Invalid data',
          errors: exception.getResponse()[0].constraints,
        });
        return;
      }
    }

    response.status(status).json({
      statusCode: status,
      message: 'Invalid data',
      error: 'HTTP Exception',
    });
  }
}
