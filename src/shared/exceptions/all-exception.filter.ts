
import { Catch, ArgumentsHost, HttpException, HttpStatus, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description Exception json response
     * @param message
     */
    const responseMessage = (type: unknown, message: unknown) : void => {
      const errorResponse = {
        statusCode: status,
        path: request.url,
        timestamp: Date.now(),
        errorType: type,
        errorMessage: message
      };
      this.logger.error(`ExceptionFilter: ${request.method} ${request.url} ${JSON.stringify(errorResponse)}`);
      response.status(status).json(errorResponse);
    };

    // Throw an exceptions for either
    // MongoError, ValidationError, TypeError, CastError and Error
    if (exception.message.error) {
      responseMessage('Error', exception.message.error);
    } else {
      responseMessage(exception.name, exception.message);
    }
  }
}
