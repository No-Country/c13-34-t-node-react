import { Repository } from 'typeorm'
import { Doctor } from '../entities'

export type DoctorRepository = Repository<Doctor>

export enum DoctorSpecialty {
  general = 'medicina general'
}
