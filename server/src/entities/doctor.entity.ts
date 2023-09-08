import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { DoctorSpecialty } from '../types/doctor.types'
import { MedicalAppointmentDates } from './medical.appointmet.dates.entity'
import { User } from './user.entity'

@Entity({ name: 'doctors' })
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @OneToOne((_type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(
    (_type) => MedicalAppointmentDates,
    (medicalAppointmentsDates) => medicalAppointmentsDates.doctor
  )
  medicalAppointmentDates: MedicalAppointmentDates[]

  @Column({ type: 'varchar', default: DoctorSpecialty.general })
  specialty: string
}
