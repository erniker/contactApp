import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from 'class-validator'

export class CreateContactDto {
  @ApiProperty()
  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  firstName: string

  @ApiProperty()
  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  lastName: string

  @ApiProperty()
  @MaxLength(35)
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsPhoneNumber('ZZ')
  @IsNotEmpty()
  phoneNumber: string
}