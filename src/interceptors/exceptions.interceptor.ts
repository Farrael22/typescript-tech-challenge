import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Response } from 'express'
import { EntityNotFoundError } from 'typeorm'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly defaultErrorMessage = 'Something went wrong'
  private logger = new Logger(HttpExceptionFilter.name)

  catch(exception: HttpException | EntityNotFoundError | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception instanceof HttpException) {
      const responseMessage = (exception.getResponse() as HttpException).message
      const message = Array.isArray(responseMessage) ? responseMessage.join('. ') : responseMessage

      this.logger.debug(`Request exception: ${message}. ${exception.stack}`)

      response.status(exception.getStatus()).json({ message })
      return
    }

    if (exception instanceof EntityNotFoundError) {
      this.logger.debug(exception)
      response.status(HttpStatus.NOT_FOUND).json({ message: 'Resource not found.' })
      return
    }

    if (exception.message.includes('duplicate key value violates unique constraint')) {
      this.logger.debug(`Duplicate constraint error: ${exception.message}`, exception.stack)
      response.status(HttpStatus.CONFLICT).json({ message: 'Resource already exists.' })
      return
    }

    this.logger.error('Internal server error: ' + exception.message, exception.stack)
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: this.defaultErrorMessage })
  }
}
