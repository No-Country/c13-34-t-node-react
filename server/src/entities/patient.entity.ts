import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './user.entity'
import { MedicalAppointment } from './medical.appointment.entity'
import { MedicalRecord } from './medical.record.entity'

@Entity({ name: 'patients' })
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @OneToOne((_type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(
    (_type) => MedicalAppointment,
    (medicalApointment) => medicalApointment.patient
  )
  medicalAppointments: MedicalAppointment[]

  @OneToMany((_type) => MedicalRecord, (medicalRecord) => medicalRecord.patient)
  medicalRecords: MedicalRecord[]
}
