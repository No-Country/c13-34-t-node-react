import dayjs from 'dayjs'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import type { Doctor, MedicalAppointmentDates, User } from '../entities'
import type { FindResult } from '../types/entity.types'
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

    const createDates = unifiedDates.map(async (date) => {
      const idToCompared = doctorExists?.id || doctorCreated?.id
      const dateInSeconds = dayjs(date).unix().toString()

      // Función para crear una nueva cita
      const createNewDate = async () => {
        const createDate = { date: dateInSeconds } as MedicalAppointmentDates
        createDate.doctor = doctorExists || (doctorCreated as Doctor)
        return await (this.entityService.create(
          createDate
        ) as Promise<MedicalAppointmentDates>)
      }

      // Busca la fecha en la BD para el doctor actual
      const dateFromDB = await this.findMedicalAppointmentDate(
        { date: dateInSeconds, doctor: { id: idToCompared } },
        false,
        { doctor: true },
        false
      )

      if (dateFromDB === null) {
        return await createNewDate()
      } else if (
        dateFromDB &&
        dateFromDB.date === dateInSeconds &&
        dateFromDB.doctor.id !== idToCompared
      ) {
        return await createNewDate()
      }

      return dateFromDB
    })

    return await Promise.all(createDates)
  }

  async findMedicalAppointmentDate(
    filters: object,
    attributes: object | false,
    relationAttributes: object | false,
    error: boolean
  ): Promise<MedicalAppointmentDates> {
    return (await this.entityService.findOne(
      filters,
      attributes,
      relationAttributes,
      error
    )) as MedicalAppointmentDates
  }

  async updateMedicalAppointmentDate(
    medicalAppoinmentDate: MedicalAppointmentDates
  ): Promise<FindResult> {
    return await this.entityService.updateOne(medicalAppoinmentDate)
  }
}
