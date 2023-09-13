import type { Repository } from 'typeorm'
import type { MedicalRecord } from '../entities/'

export type MedicalRecordRepository = Repository<MedicalRecord>
