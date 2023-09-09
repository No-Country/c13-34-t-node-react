import { Repository } from 'typeorm'
import { MedicalRecord } from '../entities/'

export type MedicalRecordRepository = Repository<MedicalRecord>
