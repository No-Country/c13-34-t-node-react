import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'
import { Patient } from './'

@Entity({ name: 'medical_records' })
export class MedicalRecord extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar' })
  allergies: string

  @Column({ type: 'text', name: 'previous_medical_conditions' })
  previousMedicalConditions: string

  @Column({ type: 'text', name: 'family_medical_history' })
  familyMedicalHistory: string

  @OneToOne((_type) => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient

  @CreateDateColumn()
  createdDateAt: Date
}
