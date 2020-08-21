import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../../app.module'
import { getConnection } from 'typeorm'
import { Console } from 'console'

const mockId: string = 'z99z99z9-9z99-999z-9z99-999999z9zzz9'

const mockCharacter = {
  name: 'pepe',
  image: 'some image',
  hierarchy: 'hierarchy',
  organization: 'organization',
}
const MockCharacterNonExixitingId = {
  name: 'pepe',
  image: 'some image',
  hierarchy: 'hierarchy',
  organization: 'organization',
  id: mockId
}

async function createCharacter(
  app,
  accessToken,
  internalCharacter = mockCharacter,
) {
  return await request(app.getHttpServer())
    .post('/characters')
    .set('Authorization', `Bearer ${accessToken}`)
    .send(internalCharacter)
}

describe('AuthController (e2e)', () => {
  let app: INestApplication
  let accessToken: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    await getConnection().synchronize(true)
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        username: 'pepe',
        password: '123$%Peaa',
      })
      .expect(function (res) {
        accessToken = res.body.accessToken
      })
  })

  afterEach(async () => {
    await getConnection().close()
  })

  describe('CharacterController create character', () => {
    it('/characters (POST) Happy path', async () => {
      const response = await request(app.getHttpServer())
        .post('/characters')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(mockCharacter)
      expect(response.status).toBe(201)
      expect(response.body.id).toBeTruthy()
      expect(response.body.name).toBe('pepe')
      expect(response.body.image).toBe('some image')
      expect(response.body.hierarchy).toBe('hierarchy')
      expect(response.body.organization).toBe('organization')
      expect(response.body.user).toBeTruthy()

    })
    it('/characters (POST) wrong params', async () => {
      const response = await request(app.getHttpServer())
        .post('/characters')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          ...mockCharacter,
          name: 4,
        })
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Bad Request')
      expect(response.body.message.toString()).toBe(
        [
          'name must be shorter than or equal to 20 characters',
          'name must be a string',
        ].join(','),
      )
    })
  })

  describe('CharacterController update character', () => {
    it('/characters/:id (PUT) Happy path', async () => {
      const character = await createCharacter(app, accessToken)
      const response = await request(app.getHttpServer())
        .put(`/characters/${character.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ ...mockCharacter, organization: 'Another organization' })
      expect(response.status).toBe(200)
    })
    it('/characters/:id (PUT) Name is not unique', async () => {
      const character = await createCharacter(app, accessToken)
      const character2 = await createCharacter(app, accessToken, {
        ...mockCharacter,
        name: 'another name',
      })
      const response = await request(app.getHttpServer())
        .put(`/characters/${character.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ ...mockCharacter, name: character2.body.name })
      expect(response.status).toBe(403)
    })
    it('/characters/:id (PUT) Character id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .put(`/characters/${mockId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(MockCharacterNonExixitingId)
      expect(response.status).toBe(400)
    })
    it('/characters/:id (PUT) Character name is too long', async () => {
      const character = await createCharacter(app, accessToken)
      const response = await request(app.getHttpServer())
        .put(`/characters/${character.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          ...mockCharacter,
          name: 'very but very very long name, even more than my...',
        })
      expect(response.status).toBe(400)
      expect(response.body.message.toString()).toBe(
        'name must be shorter than or equal to 20 characters',
      )
    })
    it('/characters/:id (PUT) Wrong params', async () => {
      const character = await createCharacter(app, accessToken)
      const response = await request(app.getHttpServer())
        .put(`/characters/${character.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          ...mockCharacter,
          organization: 4,
        })
      expect(response.status).toBe(400)
      expect(response.body.message.toString()).toBe(
        'organization must be a string',
      )
    })
  })

  describe('CharacterController get character', () => {
    it('/characters (GET) Happy path', async () => {
      await createCharacter(app, accessToken)
      const response = await request(app.getHttpServer())
        .get('/characters')
        .set('Authorization', `Bearer ${accessToken}`)
      expect(response.status).toBe(200)
      expect(response.body[0].id).toBeTruthy()
      expect(response.body[0].name).toBe('pepe')
      expect(response.body[0].image).toBe('some image')
      expect(response.body[0].hierarchy).toBe('hierarchy')
      expect(response.body[0].organization).toBe('organization')
      expect(response.body[0].user).toBeTruthy()
    })
  })

  describe('CharacterController delete character', () => {
    it('/characters/:id (DELETE) Happy path', async () => {
      const character = await createCharacter(app, accessToken)
      const response = await request(app.getHttpServer())
        .delete(`/characters/${character.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
      expect(response.status).toBe(200)
    })
    it('/characters/:id (DELETE) Character id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/characters/${mockId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(mockCharacter)
      expect(response.status).toBe(400)
    })
  })
})
