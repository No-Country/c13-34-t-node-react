import { type Repository } from 'typeorm'
import { type MedicalAppointmentDates } from '../entities/medical.appointmet.dates.entity'

export type MedicalAppointmentDatesRepository =
  Repository<MedicalAppointmentDates>

export enum MedicalAppointmentDatesStatus {
  completed = 'completed',
  selected = 'selected',
  pending = 'pending',
  cancelled = 'cancelled'
}
