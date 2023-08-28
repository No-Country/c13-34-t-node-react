import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { email } from '../types/global.types'
import { UserGenre, UserRole, UserStatus } from '../types/user.types'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 50, name: 'first_name' })
  firstName: string

  @Column({ type: 'varchar', length: 70, name: 'last_name' })
  lastName: string

  @Column({ type: 'varchar', unique: true })
  email: email

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'date', nullable: true, name: 'password_changed_at' })
  passwordChangedAt: Date

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: Date

  @Column({ type: 'varchar' })
  telephone: string

  @Column({ type: 'enum', default: UserRole.patient, enum: UserRole })
  role: UserRole

  @Column({ type: 'enum', default: UserStatus.enable, enum: UserStatus })
  status: UserStatus

  @Column({ type: 'enum', default: UserGenre.male, enum: UserGenre })
  genre: UserGenre
}
