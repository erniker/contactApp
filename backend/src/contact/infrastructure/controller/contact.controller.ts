import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Logger,
  ParseUUIDPipe,
  Get,
  Delete,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth } from '@nestjs/swagger'
import { CreateContactDto } from '../../../contact/domain/dto/create-contact.dto'
import { User } from '../../../auth/infrastructure/repository/typeorm/user.typeorm.entity'
import { ContactService } from '../../../contact/application/contact.service'
import { ContactPresenter } from '../presenters/contact.presenter'
// TODO: Import GetUser from auth Module
import { GetUser } from '../../../auth/infrastructure/service/get-user.decorator'
import { AuthService } from '../../../auth/application/auth.service'
import { UserPresenter } from '../../../auth/infrastructure/presenters/user.presenter'
import { ContactDto } from 'src/contact/domain/dto/contact.dto'
import { UpdateContactDto } from 'src/contact/domain/dto/update-contact.dto'

@Controller('contacts')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class ContactsController {
  private logger = new Logger('ContactsController')

  constructor(
    private contactService: ContactService,
    private userService: AuthService,) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createContact(
    @Body() createContactDto: CreateContactDto,
    @GetUser() user: User,
  ): Promise<ContactPresenter> {

    const { userId, ...contact } = await this.contactService.createContact(
      createContactDto,
      user.id,
    )
    const userPresenter: UserPresenter = await this.userService.getUserById(
      userId,
    )
    return { user: userPresenter, ...contact }
  }
  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateCharacter(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateContactDto: UpdateContactDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.contactService.updateContact(
      id,
      updateContactDto,
      user.id,
    )
  }
  @Get()
  async getContact(): Promise<ContactDto[]> {
    return this.contactService.getContact()
  }
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  deleteContact(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.contactService.deleteContact(id, user.id)
  }
}
