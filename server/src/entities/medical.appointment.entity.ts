import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Doctor } from './doctor.entity'
import { Patient } from './patient.entity'

@Entity({ name: 'medical_appointments' })
export class MedicalAppointment extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'date' })
  date: Date

  @ManyToOne((_type) => Doctor, (doctor) => doctor.medicalApointments)
  doctor: Doctor

  @ManyToOne((_type) => Patient, (patient) => patient.medicalAppointments)
  patient: Patient
}
