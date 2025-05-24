import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import * as dotenv from 'dotenv'
import { InfrastructureModule } from './infrastructure/infrastructure.module'
import { TransactionsModule } from './transactions/transactions.module'
import { UserMiddleware } from './authentication/middlewares/authentication.middleware'

dotenv.config()

@Module({
  imports: [InfrastructureModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
