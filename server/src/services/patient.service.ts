import { In } from 'typeorm'
import type { Patient } from '../entities/patient.entity'
import type { PatientRepository } from '../types/patient.types'
import { UserStatus } from '../types/user.types'
import { EntityFactory } from './factory/entity.factory'
import { AppError } from '../utils/app.error'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'

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
  async cancelPatientAppointment(PatientId: number): Promise<void> {
    const filters = {
      id: PatientId,
      status: In([UserStatus.disable, UserStatus.enable])
    }
    const attributes = {
      firstName: true,
      lastName: true,
      status: true,
      email: true,
      role: true,
      id: true
    }
    const patientToBeCanceled = await this.entityFactory.findOne(
      filters,
      attributes,
      false,
      false
    )
    if (!patientToBeCanceled) {
      throw new AppError(
        ERROR_MSGS.ADMIN_REGISTRATION_APPROVAL_FAIL,
        HTTPCODES.NOT_FOUND
      )
    }
  }
}
