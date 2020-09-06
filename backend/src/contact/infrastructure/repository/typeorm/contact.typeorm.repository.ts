import { Repository, EntityRepository } from 'typeorm'
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common'
import { Contact } from './contact.typeorm.entity'
import { ContactRepository } from 'src/contact/domain/repository/contact.repository'
import { ContactDto } from 'src/contact/domain/dto/contact.dto'
import { CreateContactDto } from 'src/contact/domain/dto/create-contact.dto'
import { UpdateContactDto } from 'src/contact/domain/dto/update-contact.dto'

@EntityRepository(Contact)
export class ContactRepositoryTypeorm extends Repository<Contact>
  implements ContactRepository {

  async createContact(
    createContact: CreateContactDto,
  ): Promise<ContactDto> {
    try {
      const { firstName, lastName, email, phoneNumber } = createContact

      const contact = this.create()

      contact.firstName = firstName
      contact.lastName = lastName
      contact.email = email
      contact.phoneNumber = phoneNumber

      await contact.save()
      return contact
    } catch (error) {
      if (error.code === '23505') {

        throw new ConflictException('Email already exists')
      }
      if (error instanceof BadRequestException)
        throw new BadRequestException()

      throw new InternalServerErrorException()
    }
  }
  async updateContact(
    contactId: string,
    updateContact: UpdateContactDto,
  ): Promise<void> {
    try {
      const { firstName, lastName, email, phoneNumber } = updateContact

      const contact = await this.getContactById(contactId)

      if (!contact) {
        throw new BadRequestException()
      }

      contact.firstName = firstName
      contact.lastName = lastName
      contact.email = email
      contact.phoneNumber = phoneNumber

      await contact.save()
    } catch (err) {
      if (err.code === '23505')
        throw new ForbiddenException('The contact email is already taken')
      if (err instanceof NotFoundException)
        throw new NotFoundException("Contact doesn't exists")
      if (err instanceof BadRequestException)
        throw new BadRequestException()
      throw new InternalServerErrorException()
    }
  }

  async getContactById(contactId) {
    const found = await this.findOne({
      where: { id: contactId },
    })

    if (!found) {
      throw new NotFoundException(
        `Contact with ID "${contactId}" not found`,
      )
    }

    return found
  }

  async getContacts(): Promise<ContactDto[]> {
    try {
      return await this.find({
        order: {
          firstName: 'ASC'
        }
      })
    } catch (err) {
      throw new InternalServerErrorException()
    }
  }

  async deleteContact(contactId: string): Promise<void> {
    try {
      await this.delete(contactId)
    } catch (err) {
      throw new InternalServerErrorException()
    }
  }
}
