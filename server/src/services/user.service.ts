import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { userDto } from '../dto/user.dto'
import type { User } from '../entities'
import type { FindResult, FindResults } from '../types/entity.types'
import type {
  AuthenticatedUser,
  Login,
  PasswordsType,
  UserDto,
  UserRepository
} from '../types/user.types'
import { UserStatus } from '../types/user.types'
import { AppError } from '../utils/app.error'
import { comparePasswords, hashPassword } from '../utils/bcrypt'
import { highLevelRoles } from '../utils/highLevelRoles'
import { generateJWT } from '../utils/jwt'
import { EntityService } from './entity.service'

export class UserService {
  private readonly userRepository: UserRepository
  private readonly entityService: EntityService

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

  async findAllUsers(
    filters: object | object[],
    attributes: object | false,
    relationAttributes: object | false
  ): Promise<FindResults> {
    return await this.entityService.findAll(
      filters,
      attributes,
      relationAttributes
    )
  }

  async createUser(user: User): Promise<UserDto> {
    user.password = await hashPassword(user.password)
    if (highLevelRoles.includes(user.role)) {
      user.status = UserStatus.disable
    }
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

  async updateUserPass(
    userToUpdate: User,
    passwords: PasswordsType
  ): Promise<void> {
    const { currentPassword, newPassword } = passwords

    if (currentPassword === newPassword)
      throw new AppError(ERROR_MSGS.SAME_PASSWORD_EROR, HTTPCODES.BAD_REQUEST)

    await comparePasswords(currentPassword, userToUpdate.password)

    const encriptedPass = await hashPassword(newPassword)
    const data = {
      id: userToUpdate.id,
      password: encriptedPass,
      passwordChangedAt: new Date()
    }

    try {
      await this.entityService.updateOne(data)
    } catch (e) {
      throw new AppError(
        ERROR_MSGS.PASSWORD_CHANGE_ERROR,
        HTTPCODES.BAD_REQUEST
      )
    }
  }

  async disableUser(id: number) {
    const data = { id, status: UserStatus.disable }
    try {
      await this.entityService.updateOne(data)
    } catch (e) {
      throw new AppError(
        ERROR_MSGS.USER_DISABLE_ERROR,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
  }
}
