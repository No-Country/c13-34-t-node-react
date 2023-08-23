import { userDto } from '../dto/user.dto'
import { User } from '../entities'
import { UserRepository } from '../types/user.types'
import { AppError } from '../utils/app.error'
import { hashPassword } from '../utils/bcrypt'
import { EntityService } from './entity.service'

export class UserService {
  private userRepository: UserRepository
  private entityService: EntityService

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
    this.entityService = new EntityService(userRepository)
  }

  async createUser(user: User): Promise<any> {
    user.password = await hashPassword(user.password)
    const userCreated = (await this.entityService.create(user)) as User
    return userDto(userCreated)
  }
}
