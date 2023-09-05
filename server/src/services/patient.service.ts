import type { Patient } from '../entities/patient.entity'
import type { PatientRepository } from '../types/patient.types'
import { EntityService } from './entity.service'

export class PatientService {
  // private readonly patientRepository: PatientRepository
  private readonly entityService: EntityService

  constructor(paientRepository: PatientRepository) {
    // this.patientRepository = paientRepository
    this.entityService = new EntityService(paientRepository)
  }

  async createPatient(patient: Patient): Promise<Patient> {
    return (await this.entityService.create(patient)) as Patient
  }
}
