import { AuthCredentialsDto } from '../dto/auth-credentials.dto'
import { UserDto } from '../dto/user.dto'

export interface UserRepository {
  validateUserPassword(authCredentials: AuthCredentialsDto): Promise<string>
  signUp(authCredentials: AuthCredentialsDto): Promise<void>
  findOne(any: any): Promise<any>
  getUserById(userId: string): Promise<UserDto>
}

export const USER_REPOSITORY = 'USER_REPOSITORY'
