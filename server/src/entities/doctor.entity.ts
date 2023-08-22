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
import { MedicalAppointment } from './medical.appointment.entity'
import { MedicalRecord } from './medical.record.entity'

@Entity({ name: 'doctors' })
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: Number

  @OneToOne((_type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(
    (_type) => MedicalAppointment,
    (medicalAppointment) => medicalAppointment.doctor
  )
  medicalApointments: MedicalAppointment[]

  @OneToMany((_type) => MedicalRecord, (medicalRecord) => medicalRecord.doctor)
  medicalRecords: MedicalRecord[]

  @Column({ type: 'varchar' })
  speciality: string
}
