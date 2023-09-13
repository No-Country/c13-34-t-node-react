import { medicalRecordService } from '.'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { type FindResults } from '../types/entity.types'
import type {
  PatientMedicalHistoryRepository,
  patienMedicalHistoryBody
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
    data: patienMedicalHistoryBody,
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
}
