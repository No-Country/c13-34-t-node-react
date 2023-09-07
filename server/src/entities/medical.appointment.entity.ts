import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { MedicalAppointmentDates, Patient } from '.'

@Entity({ name: 'medical_appointments' })
export class MedicalAppointment extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'text' })
  description: string

  @OneToOne((_type) => MedicalAppointmentDates)
  @JoinColumn({ name: 'medical_appointment_date_id' })
  medicalAppointmentDate: MedicalAppointmentDates

  @ManyToOne((_type) => Patient, (patient) => patient.medicalAppointments)
  @JoinColumn({ name: "patient_id" })
  patient: Patient
}
