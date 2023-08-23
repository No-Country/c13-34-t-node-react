import { EntitySchema, ObjectLiteral, ObjectType } from 'typeorm'
import { RepositoryType, FindResults, FindResult } from '../types/entity.types'
import { OptionalObjectType } from '../types/global.types'

export class EntityService {
  private entityRepository: RepositoryType

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

    if (!entity && error) throw new Error('No Se Encontro El Recurso.')

    return entity
  }

  async create(data: ObjectLiteral): Promise<ObjectLiteral> {
    const created = this.entityRepository.create(data)
    return await this.entityRepository.save(created, { listeners: false })
  }

  async updateOne(data: EntitySchema): Promise<FindResult> {
    return await this.entityRepository.save(data, { listeners: false })
  }
}
