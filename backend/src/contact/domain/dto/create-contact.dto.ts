import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsPhoneNumber, IsString, MaxLength } from 'class-validator'

export class CreateContactDto {
  @ApiProperty()
  @IsString()
  @MaxLength(25)
  firstName: string

  @ApiProperty()
  @IsString()
  @MaxLength(25)
  lastName: string

  @ApiProperty()
  @IsString()
  @MaxLength(35)
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @IsPhoneNumber('ZZ')
  phoneNumber: string
}