import { Repository } from 'typeorm'
import { Patient } from '../entities'

export type PatientRepository = Repository<Patient>
