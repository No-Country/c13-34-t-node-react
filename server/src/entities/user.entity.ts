import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from '../types/user.types'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ type: 'varchar', length: 70 })
  lastName: string

  @Column({ type: 'varchar', unique: true })
  email: string

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'enum', default: UserRole.patient, enum: UserRole })
  roles: string
}
