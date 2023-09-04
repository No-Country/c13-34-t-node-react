import type { Doctor } from '../entities'
import type { DoctorRepository } from '../types/doctor.types'
import { EntityService } from './entity.service'

export class DoctorService {
  private readonly doctorRepository: DoctorRepository
  private readonly entityService: EntityService

  constructor(doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository
    this.entityService = new EntityService(doctorRepository)
  }

  async createDoctor(doctor: object): Promise<Doctor> {
    return await this.doctorRepository.save(doctor)
  }

  async findDoctor(
    filters: object,
    attributes: object | false,
    relationAttributes: object | false,
    error: boolean
  ): Promise<Doctor> {
    return (await this.entityService.findOne(
      filters,
      attributes,
      relationAttributes,
      error
    )) as Doctor
  }

  async updateDoctor(doctor: Doctor) {
    return await this.entityService.updateOne(doctor)
  }
}
