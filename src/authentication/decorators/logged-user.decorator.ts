import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { UserEntity } from 'src/entities/user.entity'

export const LoggedUser = createParamDecorator(
  async (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request & {
      loggedUser: () => Promise<Nullable<UserEntity>>
    }

    const loggedUser = await request.loggedUser

    if (!loggedUser) throw new UnauthorizedException('Unauthenticated.')

    return loggedUser
  },
)
