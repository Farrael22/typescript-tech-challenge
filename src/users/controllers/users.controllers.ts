import { Controller, Get, HttpCode } from '@nestjs/common'
import { LoggedUser } from 'src/authentication/decorators/logged-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
import { UserResponse } from '../dtos/user.dto'

@Controller('users')
export class UsersController {
  @Get('/me')
  @HttpCode(200)
  fetchMe(@LoggedUser() requester: UserEntity) {
    return new UserResponse(requester)
  }
}
