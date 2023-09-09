import { In } from 'typeorm'
import type { Patient } from '../entities/patient.entity'
import type { PatientRepository } from '../types/patient.types'
import { EntityFactory } from './factory/entity.factory'
import { AppError } from '../utils/app.error'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { MedicalAppointmentDatesStatus } from '../types/medical.appointment.dates.types'
import { medicalAppointmentDatesService } from '.'
import { MedicalAppointmentDates } from '../entities'

export class PatientService {
  // private readonly patientRepository: PatientRepository
  private readonly entityFactory: EntityFactory

  constructor(paientRepository: PatientRepository) {
    // this.patientRepository = paientRepository
    this.entityFactory = new EntityFactory(paientRepository)
  }

  async findPatient(
    filters: object,
    attributes: object | false,
    relationAttributes: object | false,
    error: boolean
  ): Promise<Patient | null> {
    return (await this.entityFactory.findOne(
      filters,
      attributes,
      relationAttributes,
      error
    )) as Patient | null
  }

  async createPatient(patient: Patient): Promise<Patient> {
    return (await this.entityFactory.create(patient, false)) as Patient
  }

  // Cancelar la cita de parte del paciente
  async cancelPatientAppointment(appointmentId: number): Promise<void> {
    const filters = {
      id: appointmentId,
      status: In([
        MedicalAppointmentDatesStatus.pending,
        MedicalAppointmentDatesStatus.selected
      ])
    }

    let medicalAppointmentDate: MedicalAppointmentDates

    try {
      medicalAppointmentDate =
        await medicalAppointmentDatesService.findMedicalAppointmentDate(
          filters,
          false,
          false,
          false
        )
    } catch (err) {
      throw new AppError(
        ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_FAIL,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }

    if (!medicalAppointmentDate) {
      throw new AppError(
        ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_NOT_EXISTS_OR_CANCELLED_OR_COMPLETED,
        HTTPCODES.NOT_FOUND
      )
    }

    medicalAppointmentDate.status = MedicalAppointmentDatesStatus.cancelled

    try {
      await medicalAppointmentDatesService.updateMedicalAppointmentDate(
        medicalAppointmentDate
      )
    } catch (err) {
      throw new AppError(
        ERROR_MSGS.MEDICAL_APPOINTMENT_FAIL_UPDATE,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
  }
}
