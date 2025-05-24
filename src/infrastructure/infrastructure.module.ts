import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import dbConfig from 'src/.config/db.config'
import { repositoriesProviders } from './infrastructure.providers'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('DATABASE_CONFIG') as TypeOrmModuleOptions,
    }),
  ],
  providers: repositoriesProviders,
  exports: repositoriesProviders,
})
export class InfrastructureModule {}
