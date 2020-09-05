import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { ContactModule } from './contact/infrastructure/contact.module'
import { AuthModule } from './auth/infrastructure/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ContactModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
