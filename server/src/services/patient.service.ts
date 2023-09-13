import { In } from 'typeorm'
import type { MedicalAppointmentDates } from '../entities'
import type { Patient } from '../entities/patient.entity'
import type { PatientRepository } from '../types/patient.types'
import {
  medicalAppointmentDatesService,
  medicalAppointmentService,
  medicalRecordService,
  patientMedicalHistoryService
} from '.'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { MedicalAppointmentDatesStatus } from '../types/medical.appointment.dates.types'
import { AppError } from '../utils/app.error'
import { EntityFactory } from './factory/entity.factory'
import { FindResults } from '../types/entity.types'

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

  async findPatients(
    filters: object,
    attributes: object | false,
    relationAttributes: object | false
  ): Promise<FindResults> {
    return await this.entityFactory.findAll(
      filters,
      attributes,
      relationAttributes
    )
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

  async getPatientInfo(patientId: number) {
    let patientMedicalHistoryInfo
    const medicalRecordInfo = await medicalRecordService.findMedicalRecord(
      { patient: { id: patientId } },
      false,
      false,
      false
    )

    if (medicalRecordInfo?.id) {
      patientMedicalHistoryInfo =
        await patientMedicalHistoryService.findAllPatientMedicalHistory(
          { medicalRecord: { id: medicalRecordInfo?.id } },
          false,
          false
        )
    }

    const patientInfo = await this.findPatient(
      { id: patientId },
      {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          dateOfBirth: true,
          telephone: true,
          genre: true
        }
      },
      { user: true },
      false
    )

    return {
      patientInfo,
      medicalRecordInfo,
      patientMedicalHistories: {
        patientMedicalHistoryInfo: patientMedicalHistoryInfo
          ? patientMedicalHistoryInfo[0]
          : null,
        count: patientMedicalHistoryInfo ? patientMedicalHistoryInfo[1] : null
      }
    }
  }
}
