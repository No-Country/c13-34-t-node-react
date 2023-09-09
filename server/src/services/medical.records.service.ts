import { patientService } from '.'
import { MedicalRecordRepository } from '../types/medical.record.types'
import { EntityFactory } from './factory/entity.factory'

export class MedicalRecordService {
  private readonly entityFactory: EntityFactory

  constructor(medicalRecordRepository: MedicalRecordRepository) {
    this.entityFactory = new EntityFactory(medicalRecordRepository)
  }

  async createMedicalRecord(data: any, patientId: number) {
    debugger
    // const relations = {
    //   user: true,
    //   medicalAppointments: { medicalAppointmentDate: { doctor: true } }
    // }
    const patient = await patientService.findPatient(
      { id: patientId },
      false,
      false,
      false
    )
    //await this.entityFactory.create(data, false)
  }
}
