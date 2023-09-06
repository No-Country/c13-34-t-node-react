import { type Repository } from 'typeorm'
import { type MedicalAppointmentDates } from '../entities/medical.appointmet.dates.entity'
import { Doctor } from '../entities'

export type MedicalAppointmentDatesRepository =
  Repository<MedicalAppointmentDates>

export enum MedicalAppointmentDatesStatus {
  completed = 'completed',
  selected = 'selected',
  pending = 'pending',
  cancelled = 'cancelled'
}

export type ConvertedMedicalAppointmentDates = {
  date: string
  id: number
  status: MedicalAppointmentDatesStatus
  doctor: Doctor
}[]
