import { type Repository } from 'typeorm'
import type { Doctor } from '../entities'
import { type MedicalAppointmentDates } from '../entities/medical.appointmet.dates.entity'

export type MedicalAppointmentDatesRepository =
  Repository<MedicalAppointmentDates>

export enum MedicalAppointmentDatesStatus {
  completed = 'completed',
  selected = 'selected',
  pending = 'pending',
  cancelled = 'cancelled'
}

export interface ConvertedMedicalAppointmentDates {
  date: string
  id?: number
  status?: MedicalAppointmentDatesStatus
  doctor?: Doctor
}

export interface HoursType {
  hour: string
  status: string
}
