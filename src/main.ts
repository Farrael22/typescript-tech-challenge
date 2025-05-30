import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './interceptors/exceptions.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = app.get(ConfigService)

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
    }),
  )

  app.useGlobalFilters(new HttpExceptionFilter())

  const port = config.get<number>('PORT') ?? 3000
  await app.listen(port)

  console.log(`Server is running on port ${port}!`)
}

bootstrap()
