import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { AuthModule } from './auth/infrastructure/auth.module'
import { ContactModule } from './contact/infrastructure/contact.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
