import { registerAs } from '@nestjs/config'

export default registerAs('DATABASE_CONFIG', () => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/src/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/entities/migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: process.env.ENABLE_DB_LOGS === 'true',
  }
})
