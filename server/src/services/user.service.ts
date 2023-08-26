import { In, Not } from 'typeorm'
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
import { UserRole, UserStatus } from '../types/user.types'
import { AppError } from '../utils/app.error'
import { comparePasswords, hashPassword } from '../utils/bcrypt'
import { generateJWT } from '../utils/jwt'
import { EntityService } from './entity.service'
import { checkRoleForAssignment } from '../utils/check.role.for.assignment'

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

  async findAllDoctorsAndAdmins(sessionId: number) {
    const filters = [
      {
        id: Not(sessionId),
        role: In([UserRole.admin, UserRole.doctor])
      }
    ]
    const attributes = {
      firstName: true,
      lastName: true,
      role: true
    }
    const [users, count] = await this.findAllUsers(filters, attributes, false)

    return {
      users,
      count
    }
  }

  async approveRegistrationAdmin(requesterId: number, action: 'approve' | 'reject'): Promise<boolean> {
    try {
      const request = await this.entityService.findOne({ id: requesterId }, false, false, false)
      if (!request) {
        return false
      }
      request.status = action === 'approve' ? 'enable' : 'disable'
      await this.entityService.updateOne(request)
      return true
    } catch (err) {
      return false
    }
  }

  async createUser(user: User): Promise<UserDto> {
    const assignedUser = checkRoleForAssignment(user)
    assignedUser.password = await hashPassword(user.password)
    const userCreated = (await this.entityService.create(assignedUser)) as User
    return userDto(userCreated)
  }

  async signIn(loginData: Login): Promise<AuthenticatedUser> {
    const user = (await this.findUser(
      { email: loginData.email },
      false,
      false,
      true
    )) as User
    const [, token] = await Promise.all([
      comparePasswords(loginData.password, user.password),
      generateJWT({ id: user.id })
    ])

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

    const data = {
      id: userToUpdate.id,
      password: await hashPassword(newPassword),
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
    try {
      await this.entityService.updateOne({ id, status: UserStatus.disable })
    } catch (e) {
      throw new AppError(
        ERROR_MSGS.USER_DISABLE_ERROR,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
  }
}
