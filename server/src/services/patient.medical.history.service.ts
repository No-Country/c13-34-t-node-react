import { medicalRecordService } from '.'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { type FindResults } from '../types/entity.types'
import type {
  PatienMedicalHistoryBody,
  PatientMedicalHistoryRepository
} from '../types/patient.medical.history.types'
import { AppError } from '../utils/app.error'
import { EntityFactory } from './factory/entity.factory'

export class PatientMedicalHistoryService {
  private readonly entityFactory: EntityFactory

  constructor(
    patientMedicalHistoryRepository: PatientMedicalHistoryRepository
  ) {
    this.entityFactory = new EntityFactory(patientMedicalHistoryRepository)
  }

  async createPatientMedicalHistory(
    data: PatienMedicalHistoryBody,
    medicalRecordId: number
  ) {
    // Buscamos el medical record del paciente para verificar que exista
    const medicalRecord = await medicalRecordService.findMedicalRecord(
      { id: medicalRecordId },
      false,
      false,
      false
    )

    if (!medicalRecord) {
      throw new AppError(
        ERROR_MSGS.MEDICAL_RECORD_NOT_FOUND,
        HTTPCODES.NOT_FOUND
      )
    }

    const patientMedicalHistoryToCreate = {
      ...data,
      date: new Date().toLocaleDateString(),
      medicalRecord: medicalRecord.id
    }

    try {
      return await this.entityFactory.create(
        patientMedicalHistoryToCreate,
        false
      )
    } catch (err) {
      throw new AppError(
        ERROR_MSGS.PATIENT_MEDICAL_HISTORY_SAVE_FAIL,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
  }

  async findAllPatientMedicalHistory(
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

  async updatePatientMedicalHistory(
    patientMedicalHistoryId: number,
    data: PatienMedicalHistoryBody
  ) {
    try {
      // Buscamos el patientMedicalHistory por findOne mediante el id del patientMedicalHistorySchema
      const patientMedicalHistory = await this.entityFactory.findOne(
        { id: patientMedicalHistoryId },
        false,
        false,
        false
      )

      // Si el patientMedicalHistory no existe, lanzamos un error
      if (!patientMedicalHistory) {
        throw new AppError(
          ERROR_MSGS.PATIENT_MEDICAL_HISTORY_NOT_FOUND,
          HTTPCODES.NOT_FOUND
        )
      }
    } catch (err) {
      if (err instanceof AppError) {
        throw err
      }

      throw new AppError(
        ERROR_MSGS.PATIENT_MEDICAL_HISTORY_NOT_CREATED,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }

    data.id = patientMedicalHistoryId

    try {
      await this.entityFactory.updateOne(data)
    } catch (err) {
      throw new AppError(
        ERROR_MSGS.PATIENT_MEDICAL_HISTORY_NOT_UPDATED,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
  }
}
