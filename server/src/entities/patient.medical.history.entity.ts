import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
}
