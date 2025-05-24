import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from 'src/entities/user.entity'

export const LoggedUser = createParamDecorator(
  async (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request & {
      loggedUser: () => Promise<Nullable<UserEntity>>
    }

    return await request.loggedUser
  },
)
