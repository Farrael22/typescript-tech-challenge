import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { Users } from '../domains/users.domain'

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @Inject(Users)
    private readonly users: Users,
  ) {}

  use(request: Request, _response: Response, next: NextFunction) {
    Object.defineProperty(request, 'loggedUser', {
      get: () => {
        const userId = request.headers['userid'] as string

        if (userId) {
          return this.users.findById(userId)
        }

        return Promise.resolve(null)
      },
    })

    return next()
  }
}
