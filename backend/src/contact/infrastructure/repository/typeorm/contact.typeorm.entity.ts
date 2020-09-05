import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { User } from '../../../../auth/infrastructure/repository/typeorm/user.typeorm.entity'

@Entity()
@Unique(['email'])
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  phoneNumber: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @Column()
  userId: string

  @ManyToOne(
    type => User,
    user => user.contacts,
    { eager: true },
  )
  user: User
}
