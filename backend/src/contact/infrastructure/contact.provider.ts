import { Connection } from 'typeorm'
import { CONTACT_REPOSITORY } from '../domain/repository/contact.repository'
import { ContactRepositoryTypeorm } from './repository/typeorm/contact.typeorm.repository'

export const ContactProviders = [
  {
    provide: CONTACT_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(ContactRepositoryTypeorm),
    inject: ['DATABASE_CONNECTION'],
  },
]
