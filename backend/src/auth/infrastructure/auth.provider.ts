import { USER_REPOSITORY } from '../domain/repository/user.repository'
import { Connection } from 'typeorm'
import { UserRepositoryTypeorm } from './repository/typeorm/user.typeorm.repository'

export const AuthProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(UserRepositoryTypeorm),
    inject: ['DATABASE_CONNECTION'],
  },
]
