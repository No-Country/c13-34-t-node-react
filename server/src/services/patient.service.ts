import { EntityService } from './entity.service'
import { PatientRepository } from '../types/patient.types'

export class PatientService {
  private patientRepository: PatientRepository
  private entityService: EntityService

  constructor(paientRepository: PatientRepository) {
    this.patientRepository = paientRepository
    this.entityService = new EntityService(paientRepository)
  }

  async createPatient(patient: object) {
    await this.entityService.create(patient)
  }
}
