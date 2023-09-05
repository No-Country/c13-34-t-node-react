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
    console.log('doctor existe??', doctorExists)
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
    console.log('doctor creado: ', doctorCreated)

    const createDates = unifiedDates.map(async (date) => {
      const idToCompared = doctorExists?.id || doctorCreated?.id
      console.log('idToCompared', idToCompared)
      const dateInSeconds = dayjs(date).unix().toString()
      // Buscaamos la fecha recibida convertida a sec en la BD
      const dateFromDB = await this.findMedicalAppointmentDate(
        { date: dateInSeconds },
        false,
        { doctor: true },
        false
      )
      console.log('date from DB', dateFromDB)

      console.log('!dateFromDB', !dateFromDB)
      console.log(
        'dateFromDB.date !== dateInSeconds',
        dateFromDB.date !== dateInSeconds
      )
      console.log(
        'dateFromDB.doctor.id === idToCompared',
        dateFromDB.doctor.id === idToCompared
      )
      if (
        !dateFromDB ||
        (dateFromDB?.date === dateInSeconds &&
          dateFromDB?.doctor.id !== idToCompared)
      ) {
        console.log('Entré al IF..... ')
        const createDate = { date: dateInSeconds } as MedicalAppointmentDates
        createDate.doctor = doctorExists || (doctorCreated as Doctor)
        const dateCreated = await this.entityService.create(createDate)
        return dateCreated as MedicalAppointmentDates
      }
      if (dateFromDB) {
        return dateFromDB
      }
    })

    return (await Promise.all(createDates)) as MedicalAppointmentDates[]
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
