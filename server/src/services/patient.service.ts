import type { Patient } from '../entities/patient.entity'
import type { PatientRepository } from '../types/patient.types'
import { EntityFactory } from './factory/entity.factory'

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
    return (await this.entityFactory.create(patient)) as Patient
  }
}
