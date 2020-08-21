import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule)

  if (process.env.NODE_ENV !== 'production') {
    app.enableCors()
  } else {
    app.enableCors({ origin: process.env.ORIGIN })
    logger.log(`Accepting requests from origin "${process.env.origin}"`)
  }

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Contacts handler API')
    .setDescription('Api built in Nestjs to handle contacts')
    .setVersion(process.env.VERSION)
    .addTag('ContactApp')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT
  await app.listen(port)
  logger.log(`Listening on port ${port}`)
}
bootstrap()
