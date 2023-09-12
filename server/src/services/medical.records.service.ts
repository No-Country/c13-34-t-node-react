import { patientService } from '.'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { type MedicalRecord } from '../entities'
import type type { MedicalRecordRepository } from '../types/medical.record.types'
import { AppError } from '../utils/app.error'
import { EntityFactory } from './factory/entity.factory'
import { medicalRecordSchema } from '../schema/medical.record.schema'

export class MedicalRecordService {
  private readonly entityFactory: EntityFactory

  constructor(medicalRecordRepository: MedicalRecordRepository) {
    this.entityFactory = new EntityFactory(medicalRecordRepository)
  }
  // servicio de prueba para verificar relaciones correctamente
  // async getMedicalRecord(medicalRecordId: number): Promise<any> {
  //   debugger
  //   const relationAttrs = {
  //     patient: {
  //       medicalAppointments: { medicalAppointmentDate: { doctor: true } }
  //     }
  //   }
  //   const medicalRecord = await this.entityFactory.findOne(
  //     { id: medicalRecordId },
  //     false,
  //     relationAttrs,
  //     false
  //   )
  //   return medicalRecord
  // }

  async createMedicalRecord(data: any, patientId: number) {
    const patient = await patientService.findPatient(
      { id: patientId },
      false,
      false,
      false
    )
    const medicalRecordToCreate = {
      ...data,
      date: new Date().toLocaleDateString(),
      patient
    }

    try {
      return await this.entityFactory.create(medicalRecordToCreate, false)
    } catch (err) {
      throw new AppError(
        ERROR_MSGS.MEDICAL_RECORD_FAIL_SAVE,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
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

  async updateMedicalRecord(medicalRecordId: number, data: any) {
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
