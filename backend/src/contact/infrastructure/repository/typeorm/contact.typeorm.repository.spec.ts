import { Test } from '@nestjs/testing'
import { CharacterRepositoryTypeorm } from './character.typeorm.repository'
import { CreateCharacterDto } from 'src/character/domain/dto/create-character.dto'
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import { CharacterDto } from '../../../domain/dto/character.dto'

describe('CharacterRepository', () => {
  let characterRepository
  let mockCreateOrUpdateCharacterDtoSuccess: CreateCharacterDto = {
    name: 'name',
    image: 'image',
    hierarchy: 'hierarchy',
    organization: 'organization',
  }
  const mockCharacterId: string = 'z99z99z9-9z99-999z-9z99-999999z9zzz9'
  const mockUserId: string = 'z99z99z9-9z99-999z-9z99-999999z9zzz9'

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CharacterRepositoryTypeorm],
    }).compile()

    characterRepository = await module.get<CharacterRepositoryTypeorm>(
      CharacterRepositoryTypeorm,
    )
  })

  describe('method: createCharacter', () => {
    let save

    beforeEach(() => {
      save = jest.fn()
      characterRepository.create = jest.fn().mockReturnValue({ save })
    })

    it('Happy path', () => {
      save.mockResolvedValue(undefined)
      expect(
        characterRepository.createCharacter(
          mockCreateOrUpdateCharacterDtoSuccess,
        ),
      ).resolves.not.toThrow()
    })

    it('Character name already exists', async () => {
      save.mockRejectedValue({ code: '23505' })
      let response
      try {
        response = await characterRepository.createCharacter(
          mockCreateOrUpdateCharacterDtoSuccess,
          mockUserId
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof ConflictException).toBe(true)
    })

    it('Character insert unknown issue', async () => {
      save.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await characterRepository.createCharacter(
          mockCreateOrUpdateCharacterDtoSuccess,
          mockUserId
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })

  describe('method: updateCharacter', () => {
    let save

    beforeEach(() => {
      save = jest.fn()
      characterRepository.getCharacterById = jest.fn().mockReturnValue({ save })
    })

    it('Happy path', () => {
      save.mockResolvedValue(undefined)
      expect(
        characterRepository.updateCharacter(
          mockCharacterId,
          mockCreateOrUpdateCharacterDtoSuccess,
          mockUserId,
        ),
      ).resolves.not.toThrow()
    })

    it('Character insert unknown issue', async () => {
      save.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await characterRepository.updateCharacter(
          mockCharacterId,
          mockCreateOrUpdateCharacterDtoSuccess,
          mockUserId,
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
    it('Try to change a non existing character', async () => {
      characterRepository.getCharacterById = jest
        .fn()
        .mockResolvedValue(undefined)

      let response
      try {
        response = await characterRepository.updateCharacter(
          mockCharacterId,
          mockCreateOrUpdateCharacterDtoSuccess,
          mockUserId,
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof BadRequestException).toBe(true)
    })
  })

  describe('method: getCharacters', () => {
    const mockCharactersArray: CharacterDto[] = [
      {
        id: 'string',
        name: 'string',
        image: 'string',
        organization: 'string',
        hierarchy: 'string',
        user: {},
        userId: 'string',
        createdAt: 'string',
        updatedAt: 'string',
      },
      {
        id: 'string',
        name: 'string',
        image: 'string',
        organization: 'string',
        hierarchy: 'string',
        user: {},
        userId: 'string',
        createdAt: 'string',
        updatedAt: 'string',
      },
    ]

    const mockCharactersArrayLength = mockCharactersArray.length
    it('Happy path', async () => {
      characterRepository.find = jest.fn().mockReturnValue(mockCharactersArray)
      const response = await characterRepository.getCharacters()

      expect(response.length).toBe(mockCharactersArrayLength)
    })
    it('DB error', async () => {
      let response
      characterRepository.find = jest.fn().mockRejectedValue(undefined)
      try {
        response = await characterRepository.getCharacters()
      } catch (err) {
        response = err
      }

      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })

  describe('method: deleteCharacter', () => {
    let remove
    beforeEach(() => {
      remove = jest.fn()
      characterRepository.getCharacterById = jest
        .fn()
        .mockReturnValue({ remove })
    })

    it('Happy path', async () => {
      remove.mockResolvedValue(undefined)
      expect(
        characterRepository.deleteCharacter(mockCharacterId, mockUserId),
      ).resolves.not.toThrow()
    })

    it('Character delete unknown issue', async () => {
      remove.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await characterRepository.deleteCharacter(
          mockCharacterId,
          mockUserId,
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
    it('Try to delete a non existing character', async () => {
      characterRepository.getCharacterById = jest
        .fn()
        .mockResolvedValue(undefined)

      let response
      try {
        response = await characterRepository.updateCharacter(
          mockCharacterId,
          mockUserId,
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof BadRequestException).toBe(true)
    })
  })
})
