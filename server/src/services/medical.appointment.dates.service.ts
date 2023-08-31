import type { MedicalAppointmentDatesRepository } from '../types/medical.appointment.dates.types'
import { unifyDates } from '../utils/unify.dates'
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

  async createMedicalAppointmentDate(date: Date, hours: string[]) {
    const unifiedDates = unifyDates(date, hours)
    const dates = unifiedDates.map(async (date) => {
      const newdate = {}
      await this.entityService.create(newdate)
    })
    const arreglo = await Promise.all(dates)
    return arreglo
  }

  async getMedicalAppointmentDates() {}
}
