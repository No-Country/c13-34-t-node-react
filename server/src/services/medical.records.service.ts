import { Not } from 'typeorm'
import { patientService } from '.'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import type { MedicalRecord, Patient } from '../entities'
import { MedicalAppointmentDatesStatus } from '../types/medical.appointment.dates.types'
import type {
  IMedicalRecordBody,
  MedicalRecordRepository
} from '../types/medical.record.types'
import { AppError } from '../utils/app.error'
import { EntityFactory } from './factory/entity.factory'

export class MedicalRecordService {
  private readonly entityFactory: EntityFactory

  constructor(medicalRecordRepository: MedicalRecordRepository) {
    this.entityFactory = new EntityFactory(medicalRecordRepository)
  }

  async createMedicalRecord(
    data: IMedicalRecordBody,
    doctorId: number,
    patientId: number
  ) {
    let patient: Patient | undefined

    try {
      patient = (await patientService.findPatient(
        {
          id: patientId
        },
        false,
        false,
        false
      )) as Patient
      if (!patient)
        throw new AppError(ERROR_MSGS.PATIENT_NOT_FOUND, HTTPCODES.NOT_FOUND)
    } catch (err) {
      if (err instanceof AppError) {
        throw err
      }

      throw new AppError(
        ERROR_MSGS.PATIENT_NOT_FOUND,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }

    try {
      const verifyPatientAppointments = await patientService.findPatient(
        {
          id: patient.id,
          medicalAppointments: {
            medicalAppointmentDate: {
              status: Not(MedicalAppointmentDatesStatus.selected),
              doctor: { user: { id: doctorId } }
            }
          }
        },
        false,
        false,
        false
      )

      if (verifyPatientAppointments)
        throw new AppError(
          ERROR_MSGS.MEDICAL_RECORD_EXISTS,
          HTTPCODES.BAD_REQUEST
        )
    } catch (err) {
      if (err instanceof AppError) {
        throw err
      }

      throw new AppError(
        ERROR_MSGS.MEDICAL_RECORD_FAIL_FOUND,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }

    const medicalRecordToCreate = {
      ...data,
      date: new Date().toLocaleDateString(),
      patient
    }
    let medicalRecordCreated: MedicalRecord | undefined

    try {
      medicalRecordCreated = (await this.entityFactory.create(
        medicalRecordToCreate,
        false
      )) as MedicalRecord
    } catch (err) {
      throw new AppError(
        ERROR_MSGS.MEDICAL_RECORD_FAIL_SAVE,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }

    return medicalRecordCreated
  }

  async findMedicalRecord(
    filters: object,
    attributes: object | false,
    relationAttributes: object | false,
    error: boolean
  ): Promise<MedicalRecord | null> {
    return (await this.entityFactory.findOne(
      filters,
      attributes,
      relationAttributes,
      error
    )) as MedicalRecord | null
  }

  async updateMedicalRecord(medicalRecordId: number, data: IMedicalRecordBody) {
    try {
      // busco el medicalRecord por findOne mediante el id del medicalRecordSchema
      const medicalRecord = await this.entityFactory.findOne(
        { id: medicalRecordId },
        false,
        false,
        false
      )
      // si el medicalRecord tiene un valor falsy, envia al usuario "El registro médico aún no se ha creado"
      if (!medicalRecord) {
        throw new AppError(
          ERROR_MSGS.MEDICAL_RECORD_NOT_FOUND,
          HTTPCODES.NOT_FOUND
        )
      }
    } catch (err) {
      if (err instanceof AppError) {
        throw err
      }

      throw new AppError(
        ERROR_MSGS.MEDICAL_RECORD_NOT_CREATED,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }

    data.id = medicalRecordId

    try {
      await this.entityFactory.updateOne(data)
    } catch (err) {
      throw new AppError(
        ERROR_MSGS.MEDICAL_RECORD_NOT_UPDATED,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
  }
}
