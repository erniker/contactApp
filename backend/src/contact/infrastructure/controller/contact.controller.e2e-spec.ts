import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../../app.module'
import { getConnection } from 'typeorm'

const mockId: string = 'z99z99z9-9z99-999z-9z99-999999z9zzz9'

const mockContact = {
  firstName: 'pepe',
  lastName: 'pepón',
  email: 'pepepepon@123.com',
  phoneNumber: '696969696',
}
const MockContactNonExixitingId = {
  firstName: 'pepe',
  lastName: 'pepón',
  email: 'pepepepon@123.com',
  phoneNumber: '696969696',
  id: mockId
}

async function createContact(
  app,
  accessToken,
  internalContact = mockContact,
) {
  return await request(app.getHttpServer())
    .post('/contacts')
    .set('Authorization', `Bearer ${accessToken}`)
    .send(internalContact)
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

  describe('ContactController create contact', () => {
    it('/contacts (POST) Happy path', async () => {
      const response = await request(app.getHttpServer())
        .post('/contacts')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(mockContact)
      expect(response.status).toBe(201)
      expect(response.body.id).toBeTruthy()
      expect(response.body.firstName).toBe('pepe')
      expect(response.body.lastName).toBe('pepón')
      expect(response.body.email).toBe('pepepepon@123.com')
      expect(response.body.phoneNumber).toBe('696969696')
      expect(response.body.user).toBeTruthy()

    })
    it('/contacts (POST) wrong params', async () => {
      const response = await request(app.getHttpServer())
        .post('/contacts')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          ...mockContact,
          firstName: 4,
        })
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Bad Request')
      expect(response.body.message.toString()).toBe(
        [
          'firstName must be shorter than or equal to 25 characters',
          'firstName must be a string',
        ].join(','),
      )
    })
  })

  describe('ContactController update contact', () => {
    it('/contacts/:id (PUT) Happy path', async () => {
      const contact = await createContact(app, accessToken)
      const response = await request(app.getHttpServer())
        .put(`/contacts/${contact.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ ...mockContact, email: 'pepepepon1@123.com' })
      expect(response.status).toBe(200)
    })
    it('/contacts/:id (PUT) email is not unique', async () => {
      const contact = await createContact(app, accessToken)
      const contact2 = await createContact(app, accessToken, {
        ...mockContact,
        email: 'pepepepon1@123.com',
      })
      const response = await request(app.getHttpServer())
        .put(`/contacts/${contact.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ ...mockContact, email: contact2.body.email })
      expect(response.status).toBe(403)
    })
    it('/contacts/:id (PUT) Contact id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .put(`/contacts/${mockId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(MockContactNonExixitingId)
      expect(response.status).toBe(400)
    })
    it('/contacts/:id (PUT) Contact firtName is too long', async () => {
      const contact = await createContact(app, accessToken)
      const response = await request(app.getHttpServer())
        .put(`/contacts/${contact.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          ...mockContact,
          firstName: 'very but very very long firtName, even more than my... really soooo long',
        })
      expect(response.status).toBe(400)
      expect(response.body.message.toString()).toBe(
        'firstName must be shorter than or equal to 25 characters',
      )
    })
    it('/contacts/:id (PUT) Wrong params', async () => {
      const contact = await createContact(app, accessToken)
      const response = await request(app.getHttpServer())
        .put(`/contacts/${contact.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          ...mockContact,
          email: 4,
        })
      expect(response.status).toBe(400)
      expect(response.body.message.toString()).toBe(
        [
          'email must be shorter than or equal to 35 characters',
          'email must be a string',
        ].join(','),
      )
    })
  })

  describe('ContactController get contact', () => {
    it('/contacts (GET) Happy path', async () => {
      await createContact(app, accessToken)
      const response = await request(app.getHttpServer())
        .get('/contacts')
        .set('Authorization', `Bearer ${accessToken}`)
      expect(response.status).toBe(200)
      expect(response.body[0].id).toBeTruthy()
      expect(response.body[0].firstName).toBe('pepe')
      expect(response.body[0].lastName).toBe('pepón')
      expect(response.body[0].email).toBe('pepepepon@123.com')
      expect(response.body[0].phoneNumber).toBe('696969696')
      expect(response.body[0].user).toBeTruthy()
    })
  })

  describe('ContactController delete contact', () => {
    it('/contacts/:id (DELETE) Happy path', async () => {
      const contact = await createContact(app, accessToken)
      const response = await request(app.getHttpServer())
        .delete(`/contacts/${contact.body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
      expect(response.status).toBe(200)
    })
    it('/contacts/:id (DELETE) Contact id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/contacts/${mockId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(mockContact)
      expect(response.status).toBe(400)
    })
  })
})
