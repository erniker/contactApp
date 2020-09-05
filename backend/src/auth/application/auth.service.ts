import { Injectable, Logger, BadRequestException, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthCredentialsDto } from '../domain/dto/auth-credentials.dto'
import { JwtPayload } from '../domain/interfaces/jwt-payload.interface'
import { UserDto } from '../domain/dto/user.dto'

import {
  USER_REPOSITORY,
  UserRepository,
} from '../domain/repository/user.repository'

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService')

  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    await this.userRepository.signUp(authCredentialsDto)
    return this.signIn(authCredentialsDto)
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    )

    if (!username) {
      throw new BadRequestException('Invalid credentials')
    }

    const payload: JwtPayload = { username }
    const accessToken = await this.jwtService.sign(payload)
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    )

    return { accessToken }
  }

  async getUserById(userId: string): Promise<UserDto> {
    return this.userRepository.getUserById(userId)
  }
}
