import type { Repository } from 'typeorm'
import type { MedicalAppointment } from '../entities'

export type MedicalAppointmentRepository = Repository<MedicalAppointment>
