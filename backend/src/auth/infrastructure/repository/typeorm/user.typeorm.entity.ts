import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Contact } from '../../../../contact/infrastructure/repository/typeorm/contact.typeorm.entity'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column({ select: false })
  password: string

  @Column({ select: false })
  salt: string

  @OneToMany(
    type => Contact,
    contact => contact.user,
    { eager: false },
  )
  contacts: Contact[]

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    // TODO: Add time safety check
    return hash === this.password
  }
}
