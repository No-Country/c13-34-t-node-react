import type { Doctor } from '../entities'
import type { DoctorRepository } from '../types/doctor.types'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { FindResults } from '../types/entity.types'
import { AppError } from '../utils/app.error'
import { EntityFactory } from './factory/entity.factory'
import { UserStatus } from '../types/user.types'

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

  async findDoctors(
    filters: object,
    attributes: object | false,
    relationAttributes: object | false
  ): Promise<FindResults> {
    const doctors = await this.entityFactory.findAll(
      filters,
      attributes,
      relationAttributes
    )

    if (doctors[1] < 1) {
      throw new AppError(ERROR_MSGS.DOCTORS_NOT_FOUND, HTTPCODES.NOT_FOUND)
    }

    return doctors
  }

  async updateDoctor(doctor: Doctor) {
    return await this.entityFactory.updateOne(doctor)
  }
}
