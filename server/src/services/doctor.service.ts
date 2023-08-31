import { Doctor } from '../entities'
import { DoctorRepository } from '../types/doctor.types'
import { EntityService } from './entity.service'

export class DoctorService {
  private readonly doctorRepository: DoctorRepository
  private readonly entityService: EntityService

  constructor(doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository
    this.entityService = new EntityService(doctorRepository)
  }

  async createDoctor(doctor: Doctor): Promise<Doctor> {
    return await this.doctorRepository.save(doctor)
  }

  async findDoctor(doctorId: number): Promise<Doctor> {
    return (await this.entityService.findOne(
      { id: doctorId },
      false,
      false,
      false
    )) as Doctor
  }
}
