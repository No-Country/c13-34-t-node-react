import type { Repository } from 'typeorm'
import type { Patient } from '../entities'

export type PatientRepository = Repository<Patient>
