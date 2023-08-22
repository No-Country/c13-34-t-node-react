import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Patient } from './patient.entity'
import { PatientMedicalHistory } from './patient.medical.history.entity'
import { Doctor } from './doctor.entity'

@Entity({ name: 'medical_records' })
export class MedicalRecord extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'date' })
  date: Date

  @Column({ type: 'text' })
  description: string

  @ManyToOne((_type) => Doctor, (doctor) => doctor.medicalRecords)
  doctor: Doctor

  @OneToOne((_type) => PatientMedicalHistory)
  @JoinColumn({ name: 'patient_medical_history_id' })
  patientMedicalHistory: string

  @ManyToOne((_type) => Patient, (patient) => patient.medicalRecords)
  patient: Patient
}
