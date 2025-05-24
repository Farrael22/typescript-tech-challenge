import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import dbConfig from 'src/.config/db.config'
import redisConfig from '../.config/redis.config'

import { repositoriesProviders } from './infrastructure.providers'
import { BullModule } from '@nestjs/bull'
import { Queues } from 'src/entities/enums/queues.enum'
import { EventEmitterModule } from '@nestjs/event-emitter'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, redisConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('DATABASE_CONFIG') as TypeOrmModuleOptions,
    }),
    BullModule.registerQueue(...Object.values(Queues).map((queueName) => ({ name: queueName }))),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getOrThrow('REDIS_CONFIG'),
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
  ],
  providers: repositoriesProviders,
  exports: repositoriesProviders.concat(BullModule),
})
export class InfrastructureModule {}
