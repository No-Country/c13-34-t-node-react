import type { Repository } from 'typeorm'
import type { MedicalRecord } from '../entities/'

export type MedicalRecordRepository = Repository<MedicalRecord>

export interface IMedicalRecordBody {
  id?: number
  allergies?: string
  previousMedicalConditions?: string
  familyMedicalHistory?: string
}
