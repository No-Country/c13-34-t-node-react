import { userDto } from '../dto/user.dto'
import { User } from '../entities'
import { FindResult } from '../types/entity.types'
import type {
  AuthenticatedUser,
  Login,
  UserDto,
  UserRepository
} from '../types/user.types'
import { hashPassword, comparePasswords } from '../utils/bcrypt'
import { generateJWT } from '../utils/jwt'
import { EntityService } from './entity.service'

export class UserService {
  private userRepository: UserRepository
  private entityService: EntityService

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
    this.entityService = new EntityService(userRepository)
  }

  async findUser(
    filters: object,
    attributes: object | false,
    relationAttributes: object | false,
    error: boolean
  ): Promise<FindResult> {
    return await this.entityService.findOne(
      filters,
      attributes,
      relationAttributes,
      error
    )
  }

  async createUser(user: User): Promise<UserDto> {
    user.password = await hashPassword(user.password)
    const userCreated = (await this.entityService.create(user)) as User
    return userDto(userCreated)
  }

  async signIn(loginData: Login): Promise<AuthenticatedUser> {
    const { email, password } = loginData
    const user = (await this.findUser({ email }, false, false, true)) as User
    const comparePass = comparePasswords(password, user.password)
    const generateToken = generateJWT({ id: user.id })
    const [, token] = await Promise.all([comparePass, generateToken])

    return {
      token,
      user: userDto(user)
    }
  }
}
