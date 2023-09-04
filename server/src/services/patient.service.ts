import type { Patient } from '../entities'
import type { PatientRepository } from '../types/patient.types'
import { EntityService } from './entity.service'
import type { MedicalAppointmentService } from './medical.appointment.service'

export class PatientService {
  // private readonly patientRepository: PatientRepository
  private readonly entityService: EntityService

  constructor(paientRepository: PatientRepository) {
    // this.patientRepository = paientRepository
    this.entityService = new EntityService(paientRepository)
  }
  async getmedicalappointment(patient: MedicalAppointmentService) {
   this.getPatient(patient)) as patient
  }

  async createPatient(patient: Patient): Promise<Patient> {
    return (await this.entityService.create(patient)) as Patient
  }
}
