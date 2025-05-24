import { Inject, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { Users } from '../domains/users.domain'

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @Inject(Users)
    private readonly users: Users,
  ) {}

  use(request: Request, _response: Response, next: NextFunction) {
    Object.defineProperty(request, 'loggedUser', {
      get: async () => {
        const userId = request.headers['userid'] as string

        if (!userId) throw new UnauthorizedException('User is not authenticated.')

        const user = await this.users.findById(userId)

        if (!user) throw new UnauthorizedException('User is not authenticated.')

        return user
      },
    })

    return next()
  }
}
