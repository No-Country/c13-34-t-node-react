import { type ObjectLiteral } from 'typeorm'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import {
  type FindResult,
  type FindResults,
  type RepositoryType
} from '../types/entity.types'
import { type OptionalObjectType } from '../types/global.types'
import { AppError } from '../utils/app.error'

export class EntityService {
  private readonly entityRepository: RepositoryType

  constructor(repository: RepositoryType) {
    this.entityRepository = repository
  }

  async findAll(
    filters: object,
    attributes: OptionalObjectType,
    relationAttributes: OptionalObjectType
  ): Promise<FindResults> {
    return await this.entityRepository.findAndCount({
      where: filters,
      ...(attributes && { select: attributes }),
      ...(relationAttributes && { relations: relationAttributes })
    })
  }

  async findOne(
    filters: object,
    attributes: OptionalObjectType,
    relationAttributes: OptionalObjectType,
    error: boolean
  ): Promise<FindResult> {
    const entity = await this.entityRepository.findOne({
      where: filters,
      ...(attributes && { select: attributes }),
      ...(relationAttributes && { relations: relationAttributes })
    })

    if (!entity && error)
      throw new AppError(ERROR_MSGS.RESOURCE_NOT_FOUND, HTTPCODES.NOT_FOUND)

    return entity
  }

  async create(data: ObjectLiteral): Promise<ObjectLiteral> {
    debugger
    const created = this.entityRepository.create(data)
    try {
      return await this.entityRepository.save(created, { listeners: false })
    } catch (e) {
      console.log(e)
      throw new AppError(
        ERROR_MSGS.RESOURCE_CREATION_ERROR,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
  }

  async updateOne(data: object): Promise<FindResult> {
    return await this.entityRepository.save(data, { listeners: false })
  }
}
