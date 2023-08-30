import type { MedicalAppointmentDatesRepository } from '../types/medical.appointment.dates.types'
import { EntityService } from './entity.service'

export class MedicalAppointmentDatesService {
  private readonly medicalAppointmentDatesRepository: MedicalAppointmentDatesRepository
  private readonly entityService: EntityService

  constructor(
    medicalAppointmentDatesRepository: MedicalAppointmentDatesRepository
  ) {
    this.medicalAppointmentDatesRepository = medicalAppointmentDatesRepository
    this.entityService = new EntityService(medicalAppointmentDatesRepository)
  }

  async createMedicalAppointmentDate() {}

  async getMedicalAppointmentDates() {}
}
