import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from 'class-validator'

export class UpdateContactDto {
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

  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string

  @IsPhoneNumber('ZZ')
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string
}