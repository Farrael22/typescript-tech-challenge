import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import * as dotenv from 'dotenv'
import { InfrastructureModule } from './infrastructure/infrastructure.module'
import { TransactionsModule } from './transactions/transactions.module'
import { AuthenticationMiddleware } from './authentication/middlewares/authentication.middleware'
import { UsersModule } from './users/users.module'

dotenv.config()

@Module({
  imports: [InfrastructureModule, TransactionsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
