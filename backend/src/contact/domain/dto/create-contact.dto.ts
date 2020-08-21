import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

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
  email: string

  @ApiProperty()
  @IsString()
  phoneNumber: string
}