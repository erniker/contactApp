import { CreateContactDto } from '../dto/create-contact.dto'
import { UpdateContactDto } from '../dto/update-contact.dto'
import { ContactDto } from '../dto/contact.dto'

export interface ContactRepository {
  createContact(
    createContact: CreateContactDto,
    userId: string,
  ): Promise<ContactDto>
  updateContact(
    contactId: string,
    createContact: UpdateContactDto,
    userId: string,
  ): Promise<void>
  getContacts(): Promise<ContactDto[]>

  getContactById(contactId: string, userId: string): Promise<ContactDto>

  deleteContact(contactId: string, userId: string): Promise<void>
}

export const CONTACT_REPOSITORY = 'CONTACT_REPOSITORY'
