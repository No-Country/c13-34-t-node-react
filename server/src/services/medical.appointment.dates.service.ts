import { Doctor, MedicalAppointmentDates, User } from '../entities'
import type { MedicalAppointmentDatesRepository } from '../types/medical.appointment.dates.types'
import { AppError } from '../utils/app.error'
import { unifyDates } from '../utils/unify.dates'
import { EntityService } from './entity.service'
import { doctorService } from './factory/entities.factory'

export class MedicalAppointmentDatesService {
  private readonly medicalAppointmentDatesRepository: MedicalAppointmentDatesRepository
  private readonly entityService: EntityService

  constructor(
    medicalAppointmentDatesRepository: MedicalAppointmentDatesRepository
  ) {
    this.medicalAppointmentDatesRepository = medicalAppointmentDatesRepository
    this.entityService = new EntityService(medicalAppointmentDatesRepository)
  }

  async createMedicalAppointmentDates(
    sessionUser: User,
    date: Date,
    hours: string[]
  ) {
    //medicaappointmentdates
    const unifiedDates = unifyDates(date, hours)
    const createDates = unifiedDates.map(async (date) => {
      const dateToCreate = { date }
      const dateCreated = (await this.entityService.create(
        dateToCreate
      )) as MedicalAppointmentDates

      return dateCreated
    })
    const datesCreated = await Promise.all(createDates)
    //doctor
    let doctor
    const doctorExists = await doctorService.findDoctor(sessionUser?.id)

    if (!doctorExists) {
      const doctorToCreate = {
        user: sessionUser
      }
      doctor = await doctorService.createDoctor(doctorToCreate as Doctor)
    }
    if (!doctor) throw new AppError('', 400)

    doctor.medicalAppointmentDates = datesCreated

    return datesCreated
  }

  async getMedicalAppointmentDates() {}
}
