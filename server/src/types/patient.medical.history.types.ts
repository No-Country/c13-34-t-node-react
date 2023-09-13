import type { Repository } from 'typeorm'
import type { PatientMedicalHistory } from '../entities'

export type PatientMedicalHistoryRepository = Repository<PatientMedicalHistory>

export interface PatienMedicalHistoryBody {
  id?: number
  notes?: string
  symptoms?: string
  treatments?: string
  medication?: string
  heigth?: number
  bloodPressure?: string
  weight?: number
}
