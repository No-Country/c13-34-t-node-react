import { In } from 'typeorm'
import type { Doctor, MedicalAppointmentDates, User } from '../entities'
import type { FindResult, FindResults } from '../types/entity.types'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import {
  MedicalAppointmentDatesStatus,
  type MedicalAppointmentDatesRepository
} from '../types/medical.appointment.dates.types'
import { AppError } from '../utils/app.error'
import { dateToSecondsToString } from '../utils/datejs'
import { unifyDates } from '../utils/unify.dates'
import { doctorService } from './'
import { EntityFactory } from './factory/entity.factory'

export class MedicalAppointmentDatesService {
  private readonly entityFactory: EntityFactory

  constructor(
    medicalAppointmentDatesRepository: MedicalAppointmentDatesRepository
  ) {
    this.entityFactory = new EntityFactory(medicalAppointmentDatesRepository)
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
      const dateInSeconds = dateToSecondsToString(date)

      // Función para crear una nueva cita
      const createNewDate = async () => {
        const createDate = { date: dateInSeconds } as MedicalAppointmentDates
        createDate.doctor = doctorExists || (doctorCreated as Doctor)
        return await (this.entityFactory.create(
          createDate,
          true
        ) as Promise<MedicalAppointmentDates>)
      }

      // Busca la fecha en la BD para el doctor actual
      const dateFromDB = await this.findMedicalAppointmentDate(
        { date: dateInSeconds, doctor: { id: idToCompared } },
        false,
        { doctor: true },
        false
      )

      if (!dateFromDB) {
        return await createNewDate()
      } else if (
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
    return (await this.entityFactory.findOne(
      filters,
      attributes,
      relationAttributes,
      error
    )) as MedicalAppointmentDates
  }

  async updateMedicalAppointmentDate(
    medicalAppoinmentDate: MedicalAppointmentDates
  ): Promise<FindResult> {
    return await this.entityFactory.updateOne(medicalAppoinmentDate)
  }

  // Cambia el estado de la fecha de una cita médica a:
  // selected --> cancelled
  // pending <--> cancelled, y viceversa
  async toggleStatusMedicalAppointmentDate(id: string): Promise<void> {
    const date = await this.findMedicalAppointmentDate(
      { id },
      false,
      false,
      true
    )

    if (!date) {
      throw new AppError(
        ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_DATE_INVALID_FORMAT,
        HTTPCODES.NOT_FOUND
      )
    }

    switch (date.status) {
      case MedicalAppointmentDatesStatus.selected:
        date.status = MedicalAppointmentDatesStatus.cancelled
        break
      case MedicalAppointmentDatesStatus.cancelled:
        date.status = MedicalAppointmentDatesStatus.pending
        break
      case MedicalAppointmentDatesStatus.pending:
        date.status = MedicalAppointmentDatesStatus.cancelled
        break
    }

    await this.updateMedicalAppointmentDate(date)
  }

  async findMedicalAppointmentDates(
    filters: object | object[],
    attributes: object | false,
    relationAttributes: object | false
  ): Promise<FindResults> {
    return await this.entityFactory.findAll(
      filters,
      attributes,
      relationAttributes
    )
  }

  // Get para traer todas las fechas que un médico previamente subió al sistema
  async getAllMedicalAppoitmentDates(id: number) {
    const doctorExists = await doctorService.findDoctor(
      { user: { id } },
      false,
      false,
      false
    )

    const filters = {
      doctor: { id: doctorExists.id },
      status: In([
        MedicalAppointmentDatesStatus.cancelled,
        MedicalAppointmentDatesStatus.pending,
        MedicalAppointmentDatesStatus.selected
      ])
    }

    const relationAttributes = { doctor: true }

    return await this.findMedicalAppointmentDates(
      filters,
      false,
      relationAttributes
    )
  }
}
