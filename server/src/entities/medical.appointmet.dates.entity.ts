import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { MedicalAppointmentDatesStatus } from '../types/medical.appointments.dates.types'
import { Doctor } from './doctor.entity'

@Entity({ name: 'medical_appointments_dates' })
export class MedicalAppointmentDates extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'date' })
  date: Date

  @Column({
    type: 'enum',
    default: MedicalAppointmentDatesStatus.pending,
    enum: MedicalAppointmentDatesStatus
  })
  status: MedicalAppointmentDatesStatus

  @ManyToOne((_type) => Doctor, (doctor) => doctor.medicalAppointmentDates)
  doctor: Doctor
}
