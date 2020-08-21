import { Module } from '@nestjs/common'
import { AuthController } from './controller/auth.controller'
import { AuthService } from '../application/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './service/jwt.strategy'
import { AuthProviders } from './auth.provider'
import { DatabaseProviders } from '../../config/database.provider'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ...AuthProviders, ...DatabaseProviders],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
