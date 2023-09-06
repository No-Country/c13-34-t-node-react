import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { MedicalAppointmentDatesStatus } from '../types/medical.appointment.dates.types'
import { Doctor } from './doctor.entity'

@Entity({ name: 'medical_appointments_dates' })
export class MedicalAppointmentDates extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar' })
  date: string

  @Column({
    type: 'enum',
    default: MedicalAppointmentDatesStatus.pending,
    enum: MedicalAppointmentDatesStatus
  })
  status: MedicalAppointmentDatesStatus

  @ManyToOne((_type) => Doctor, (doctor) => doctor.medicalAppointmentDates)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor
}
