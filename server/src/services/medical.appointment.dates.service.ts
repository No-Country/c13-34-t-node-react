import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import type { Doctor, MedicalAppointmentDates, User } from '../entities'
import type { MedicalAppointmentDatesRepository } from '../types/medical.appointment.dates.types'
import { AppError } from '../utils/app.error'
import { unifyDates } from '../utils/unify.dates'
import { EntityService } from './entity.service'
import { doctorService } from './factory/entities.factory'

export class MedicalAppointmentDatesService {
  private readonly entityService: EntityService

  constructor(
    medicalAppointmentDatesRepository: MedicalAppointmentDatesRepository
  ) {
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
        throw new AppError(
          ERROR_MSGS.CREATE_DOCTOR_SERVICE_FAIL,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
    }

    const createDates = unifiedDates.map(async (date: unknown) => {
      const dateType = date as Date
      const createDate = { date: dateType } as MedicalAppointmentDates
      createDate.doctor = doctorExists || (doctorCreated as Doctor)
      const dateCreated = await this.entityService.create(createDate)

      return dateCreated as MedicalAppointmentDates
    })
    return await Promise.all(createDates)
  }

  async getMedicalAppointmentDates() {}
}
