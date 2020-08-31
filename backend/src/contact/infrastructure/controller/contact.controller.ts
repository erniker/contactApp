import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Logger,
  ParseUUIDPipe,
  Get,
  Delete,
} from '@nestjs/common'
import { CreateContactDto } from '../../../contact/domain/dto/create-contact.dto'
import { ContactService } from '../../../contact/application/contact.service'
import { ContactPresenter } from '../presenters/contact.presenter'
import { ContactDto } from 'src/contact/domain/dto/contact.dto'
import { UpdateContactDto } from '../../../contact/domain/dto/update-contact.dto'

@Controller('contacts')
export class ContactsController {
  private logger = new Logger('ContactsController')

  constructor(
    private contactService: ContactService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createContact(
    @Body() createContactDto: CreateContactDto,
  ): Promise<ContactPresenter> {

    const { ...contact } = await this.contactService.createContact(
      createContactDto,
    )
    return { ...contact }
  }
  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateContact(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateContactDto: UpdateContactDto,
  ): Promise<void> {
    return this.contactService.updateContact(
      id,
      updateContactDto
    )
  }
  @Get()
  async getContacts(): Promise<ContactDto[]> {
    return this.contactService.getContacts()
  }

  @Get('/:id')
  getContact(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ContactDto> {
    return this.contactService.getContactById(id)
  }

  @Delete('/:id')
  deleteContact(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.contactService.deleteContact(id)
  }
}
