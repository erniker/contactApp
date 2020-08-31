import { CreateContactDto } from '../dto/create-contact.dto'
import { UpdateContactDto } from '../dto/update-contact.dto'
import { ContactDto } from '../dto/contact.dto'

export interface ContactRepository {
  createContact(
    createContact: CreateContactDto,
  ): Promise<ContactDto>
  updateContact(
    contactId: string,
    createContact: UpdateContactDto,
  ): Promise<void>
  getContacts(): Promise<ContactDto[]>

  getContactById(contactId: string): Promise<ContactDto>

  deleteContact(contactId: string): Promise<void>
}

export const CONTACT_REPOSITORY = 'CONTACT_REPOSITORY'
