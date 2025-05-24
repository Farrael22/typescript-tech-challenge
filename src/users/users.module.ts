import { Module } from '@nestjs/common'
import { UsersController } from './controllers/users.controllers'

@Module({
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
