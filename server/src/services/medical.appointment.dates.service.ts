import { Doctor, MedicalAppointmentDates, User } from '../entities'
import type { MedicalAppointmentDatesRepository } from '../types/medical.appointment.dates.types'
import { AppError } from '../utils/app.error'
import { unifyDates } from '../utils/unify.dates'
import { EntityService } from './entity.service'
import { doctorService } from './factory/entities.factory'

export class MedicalAppointmentDatesService {
  //private readonly medicalAppointmentDatesRepository: MedicalAppointmentDatesRepository
  private readonly entityService: EntityService

  constructor(
    medicalAppointmentDatesRepository: MedicalAppointmentDatesRepository
  ) {
    //this.medicalAppointmentDatesRepository = medicalAppointmentDatesRepository
    this.entityService = new EntityService(medicalAppointmentDatesRepository)
  }

  async createMedicalAppointmentDates(
    sessionUser: User,
    date: string,
    hours: string[]
  ): Promise<MedicalAppointmentDates[]> {
    const unifiedDates = unifyDates(date, hours)

    let doctorCreated: Doctor | undefined

    const doctorExists = await doctorService.findDoctor(
      { user: { id: sessionUser.id } },
      false,
      false,
      false
    )

    if (!doctorExists) {
      const doctorToCreate = {
        user: sessionUser
      }
      doctorCreated = await doctorService.createDoctor(doctorToCreate)
      if (!doctorCreated)
        throw new AppError('El médico no se creo en la base de datos.', 500)
    }

    const createDates = unifiedDates.map(async (date: unknown) => {
      const dateType = date as Date
      const createDate = { date: dateType } as MedicalAppointmentDates
      createDate.doctor = doctorExists
        ? doctorExists
        : (doctorCreated as Doctor)
      const dateCreated = await this.entityService.create(createDate)

      return dateCreated as MedicalAppointmentDates
    })
    return await Promise.all(createDates)
  }

  async getMedicalAppointmentDates() {}
}
