import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { MedicalRecord } from '.'

@Entity({ name: 'patients_medical_history' })
export class PatientMedicalHistory extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'date' })
  date: Date

  @Column({ type: 'text' })
  notes: string

  @Column({ type: 'text' })
  symptoms: string

  @Column({ type: 'text' })
  treatments: string

  @Column({ type: 'varchar' })
  medication: string

  @Column({ type: 'int' })
  height: number

  @Column({ type: 'text', name: 'blood_pressure' })
  bloodPressure: string

  @Column({ type: 'int' })
  weight: number

  @ManyToOne((_type) => MedicalRecord)
  @JoinColumn({ name: 'medical_record_id' })
  medicalRecord: number
}
