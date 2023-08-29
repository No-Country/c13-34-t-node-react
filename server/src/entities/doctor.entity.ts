import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './user.entity'
import { MedicalAppointmentDates } from './medical.appointmet.dates.entity'

@Entity({ name: 'doctors' })
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @OneToOne((_type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(
    (_type) => MedicalAppointmentDates,
    (medicalAppointmentsDates) => medicalAppointmentsDates
  )
  medicalAppointmentDates: MedicalAppointmentDates[]

  @Column({ type: 'varchar' })
  specialty: string
}
