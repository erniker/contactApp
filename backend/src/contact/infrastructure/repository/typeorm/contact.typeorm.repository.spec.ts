import { Test } from '@nestjs/testing'
import { ContactRepositoryTypeorm } from './contact.typeorm.repository'
import { CreateContactDto } from 'src/contact/domain/dto/create-contact.dto'
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import { ContactDto } from '../../../domain/dto/contact.dto'

describe('ContactRepository', () => {
  let contactRepository
  let mockCreateOrUpdateContactDtoSuccess: CreateContactDto = {
    firstName: 'pepe',
    lastName: 'pepón',
    email: 'pepepepon@123.com',
    phoneNumber: '696969696',
  }
  const mockContactId: string = 'z99z99z9-9z99-999z-9z99-999999z9zzz9'


  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ContactRepositoryTypeorm],
    }).compile()

    contactRepository = await module.get<ContactRepositoryTypeorm>(
      ContactRepositoryTypeorm,
    )
  })

  describe('method: createContact', () => {
    let save

    beforeEach(() => {
      save = jest.fn()
      contactRepository.create = jest.fn().mockReturnValue({ save })
    })

    it('Happy path', () => {
      save.mockResolvedValue(undefined)
      expect(
        contactRepository.createContact(
          mockCreateOrUpdateContactDtoSuccess,
        ),
      ).resolves.not.toThrow()
    })

    it('Contact name already exists', async () => {
      save.mockRejectedValue({ code: '23505' })
      let response
      try {
        response = await contactRepository.createContact(
          mockCreateOrUpdateContactDtoSuccess
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof ConflictException).toBe(true)
    })

    it('Contact insert unknown issue', async () => {
      save.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await contactRepository.createContact(
          mockCreateOrUpdateContactDtoSuccess
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })

  describe('method: updateContact', () => {
    let save

    beforeEach(() => {
      save = jest.fn()
      contactRepository.getContactById = jest.fn().mockReturnValue({ save })
    })

    it('Happy path', () => {
      save.mockResolvedValue(undefined)
      expect(
        contactRepository.updateContact(
          mockContactId,
          mockCreateOrUpdateContactDtoSuccess
        ),
      ).resolves.not.toThrow()
    })

    it('Contact insert unknown issue', async () => {
      save.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await contactRepository.updateContact(
          mockContactId,
          mockCreateOrUpdateContactDtoSuccess
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
    it('Try to change a non existing contact', async () => {
      contactRepository.getContactById = jest
        .fn()
        .mockResolvedValue(undefined)

      let response
      try {
        response = await contactRepository.updateContact(
          mockContactId,
          mockCreateOrUpdateContactDtoSuccess
          // mockUserId,
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof BadRequestException).toBe(true)
    })
  })

  describe('method: getContacts', () => {
    const mockContactsArray: ContactDto[] = [
      {
        id: 'string',
        firstName: 'pepe',
        lastName: 'pepón',
        email: 'pepepepon@123.com',
        phoneNumber: '696969696',
        createdAt: 'string',
        updatedAt: 'string',
      },
      {
        id: 'string',
        firstName: 'pepe',
        lastName: 'pepón',
        email: 'pepepepon@123.com',
        phoneNumber: '696969696',
        createdAt: 'string',
        updatedAt: 'string',
      },
    ]

    const mockContactsArrayLength = mockContactsArray.length
    it('Happy path', async () => {
      contactRepository.find = jest.fn().mockReturnValue(mockContactsArray)
      const response = await contactRepository.getContacts()

      expect(response.length).toBe(mockContactsArrayLength)
    })
    it('DB error', async () => {
      let response
      contactRepository.find = jest.fn().mockRejectedValue(undefined)
      try {
        response = await contactRepository.getContacts()
      } catch (err) {
        response = err
      }

      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })

  describe('method: deleteContact', () => {
    let remove
    beforeEach(() => {
      remove = jest.fn()
      contactRepository.getContactById = jest
        .fn()
        .mockReturnValue({ remove })
    })

    it('Happy path', async () => {
      remove.mockResolvedValue(undefined)
      expect(
        contactRepository.deleteContact(mockContactId
        ),
      ).resolves.not.toThrow()
    })

    it('Contact delete unknown issue', async () => {
      remove.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await contactRepository.deleteContact(
          mockContactId
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
    it('Try to delete a non existing contact', async () => {
      contactRepository.getContactById = jest
        .fn()
        .mockResolvedValue(undefined)

      let response
      try {
        response = await contactRepository.deleteContact(
          mockContactId
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })
})
