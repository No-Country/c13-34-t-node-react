import type { Patient } from '../entities'
import type { PatientRepository } from '../types/patient.types'
import { EntityService } from './entity.service'

export class PatientService {
  //private readonly patientRepository: PatientRepository
  private readonly entityService: EntityService

  constructor(paientRepository: PatientRepository) {
    //this.patientRepository = paientRepository
    this.entityService = new EntityService(paientRepository)
  }

  async findPatient(
    filters: object,
    attributes: object | false,
    relationAttributes: object | false,
    error: boolean
  ): Promise<Patient | null> {
    return (await this.entityService.findOne(
      filters,
      attributes,
      relationAttributes,
      error
    )) as Patient | null
  }

  async createPatient(patient: Patient): Promise<Patient> {
    return (await this.entityService.create(patient)) as Patient
  }
}
