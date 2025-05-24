import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import * as dotenv from 'dotenv'
import { InfrastructureModule } from './infrastructure/infrastructure.module'

dotenv.config()

@Module({
  imports: [InfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
