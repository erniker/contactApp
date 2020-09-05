import { Module } from '@nestjs/common'
import { DatabaseProviders } from '../../config/database.provider'
import { ContactProviders } from './contact.provider'
import { ContactsController } from './controller/contact.controller'
import { ContactService } from '../application/contact.service'
import { AuthModule } from '../../auth/infrastructure/auth.module'

@Module({
  imports: [AuthModule],
  controllers: [ContactsController],
  providers: [ContactService, ...DatabaseProviders, ...ContactProviders],
})
export class ContactModule { }
