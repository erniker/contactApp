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
  constructor(
    @Inject(CONTACT_REPOSITORY)
    private contactRepository: ContactRepository,
  ) { }

  async createContact(
    createContact: CreateContactDto,
  ): Promise<ContactDto> {
    return this.contactRepository.createContact(createContact)
  }

  async updateContact(
    contactId: string,
    updateContact: UpdateContactDto,
  ): Promise<void> {
    return this.contactRepository.updateContact(
      contactId,
      updateContact,
    )
  }

  async getContacts(): Promise<ContactDto[]> {
    return this.contactRepository.getContacts()
  }

  async getContactById(contactId: string): Promise<ContactDto> {
    return this.contactRepository.getContactById(contactId)
  }

  async deleteContact(contactId: string): Promise<void> {
    return this.contactRepository.deleteContact(contactId)
  }
}
