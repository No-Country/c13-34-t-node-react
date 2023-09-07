import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Patient } from './'

@Entity({ name: 'medical_records' })
export class MedicalRecord extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'date' })
  date: Date

  @Column({ type: 'text' })
  description: string

  @ManyToOne((_type) => Patient, (patient) => patient.medicalRecords)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient
}
