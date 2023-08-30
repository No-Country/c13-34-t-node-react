import { MedicalAppointmentDatesRepository } from '../types/medical.appointment.dates.types'
import { EntityService } from './entity.service'

export class MedicalAppointmentDatesService {
  private medicalAppointmentDatesRepository: MedicalAppointmentDatesRepository
  private entityService: EntityService

  constructor(
    medicalAppointmentDatesRepository: MedicalAppointmentDatesRepository
  ) {
    this.medicalAppointmentDatesRepository = medicalAppointmentDatesRepository
    this.entityService = new EntityService(medicalAppointmentDatesRepository)
  }

  async createMedicalAppointmentDate() {}

  async getMedicalAppointmentDates() {}
}
