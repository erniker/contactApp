import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { ContactModule } from './contact/infrastructure/contact.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
