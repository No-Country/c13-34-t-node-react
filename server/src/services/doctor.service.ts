import type { Doctor } from '../entities'
import type { DoctorRepository } from '../types/doctor.types'
import { EntityFactory } from './factory/entity.factory'

export class DoctorService {
  private readonly doctorRepository: DoctorRepository
  private readonly entityFactory: EntityFactory

  constructor(doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository
    this.entityFactory = new EntityFactory(doctorRepository)
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
    return (await this.entityFactory.findOne(
      filters,
      attributes,
      relationAttributes,
      error
    )) as Doctor
  }

  async updateDoctor(doctor: Doctor) {
    return await this.entityFactory.updateOne(doctor)
  }
}
