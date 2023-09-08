import type { Repository } from 'typeorm'
import type { Doctor } from '../entities'

export type DoctorRepository = Repository<Doctor>

export enum DoctorSpecialty {
  general = 'medicina general'
}
