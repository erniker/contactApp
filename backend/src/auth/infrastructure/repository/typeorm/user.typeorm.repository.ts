import { Repository, EntityRepository } from 'typeorm'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { User } from './user.typeorm.entity'
import { AuthCredentialsDto } from '../../../domain/dto/auth-credentials.dto'
import { UserRepository } from 'src/auth/domain/repository/user.repository'
import { UserDto } from 'src/auth/domain/dto/user.dto'

@EntityRepository(User)
export class UserRepositoryTypeorm extends Repository<User>
  implements UserRepository {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { username, password } = authCredentialsDto
      const user = this.create()
      user.username = username
      user.salt = await bcrypt.genSalt()
      user.password = await this.hashPassword(password, user.salt)
      await user.save()
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto
    const user = await this.findOne(
      { username },
      { select: ['username', 'password', 'salt'] },
    )

    if (user && (await user.validatePassword(password))) {
      return user.username
    } else {
      return null
    }
  }

  async getUserById(userId: string): Promise<UserDto> {
    return this.findOne(userId, { select: ['id', 'username'] })
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
