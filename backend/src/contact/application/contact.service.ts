import { Injectable, Logger, Inject } from '@nestjs/common'
import {
  CONTACT_REPOSITORY,
  ContactRepository,
} from '../domain/repository/contact.repository'
import { CreateContactDto } from '../domain/dto/create-contact.dto'
import { UpdateContactDto } from '../domain/dto/update-contact.dto'
import { ContactDto } from '../domain/dto/contact.dto'

@Injectable()
export class ContactService {
  private logger = new Logger('ContactService')

  constructor(
    @Inject(CONTACT_REPOSITORY)
    private contactRepository: ContactRepository,
  ) { }

  async createContact(
    createContact: CreateContactDto,
    userId: string,
  ): Promise<ContactDto> {
    return this.contactRepository.createContact(createContact, userId)
  }

  async updateContact(
    contactId: string,
    updateContact: UpdateContactDto,
    userId: string,
  ): Promise<void> {
    return this.contactRepository.updateContact(
      contactId,
      updateContact,
      userId,
    )
  }

  async getContact(): Promise<ContactDto[]> {
    return this.contactRepository.getContacts()
  }

  async deleteContact(contactId: string, userId: string): Promise<void> {
    return this.contactRepository.deleteContact(contactId, userId)
  }
}
