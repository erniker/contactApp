import { Module } from '@nestjs/common'
import { DatabaseProviders } from '../../config/database.provider'
import { ContactProviders } from './contact.provider'
import { AuthModule } from '../../auth/infrastructure/auth.module'
import { ContactsController } from './controller/contact.controller'
import { ContactService } from '../application/contact.service'

@Module({
  imports: [AuthModule],
  controllers: [ContactsController],
  providers: [ContactService, ...DatabaseProviders, ...ContactProviders],
})
export class ContactModule { }
