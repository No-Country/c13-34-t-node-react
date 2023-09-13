import { In, Not } from 'typeorm'
import type { User } from '../entities'
import type { FindResult, FindResults } from '../types/entity.types'
import type {
  AuthenticatedUser,
  Login,
  PasswordsType,
  UserDto,
  UserRepository
} from '../types/user.types'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { userDto } from '../dto/user.dto'
import { UserRole, UserStatus } from '../types/user.types'
import { AppError } from '../utils/app.error'
import { comparePasswords, hashPassword } from '../utils/bcrypt'
import { checkRoleForAssignment } from '../utils/check.role.for.assignment'
import { generateJWT } from '../utils/jwt'
import { EntityFactory } from './factory/entity.factory'
import { doctorService, patientService } from '.'

export class UserService {
  private readonly entityFactory: EntityFactory

  constructor(userRepository: UserRepository) {
    this.entityFactory = new EntityFactory(userRepository)
  }

  async findUser(
    filters: object,
    attributes: object | false,
    relationAttributes: object | false,
    error: boolean
  ): Promise<FindResult> {
    return await this.entityFactory.findOne(
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
    return await this.entityFactory.findAll(
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
      dateOfBirth: true,
      telephone: true,
      firstName: true,
      lastName: true,
      status: true,
      email: true,
      genre: true,
      role: true,
      id: true
    }

    return await this.findAllUsers(filters, attributes, false)
  }

  async approveAdminDocsRegistration(userId: number): Promise<FindResult> {
    const filters = {
      id: userId,
      status: In([UserStatus.disable, UserStatus.pending])
    }
    const attributes = {
      firstName: true,
      lastName: true,
      status: true,
      email: true,
      role: true,
      id: true
    }
    const userToBeUpdated = await this.entityFactory.findOne(
      filters,
      attributes,
      false,
      false
    )

    if (!userToBeUpdated)
      throw new AppError(
        ERROR_MSGS.ADMIN_REGISTRATION_APPROVAL_FAIL,
        HTTPCODES.BAD_REQUEST
      )

    userToBeUpdated.status = UserStatus.enable

    try {
      return await this.entityFactory.updateOne(userToBeUpdated)
    } catch (error) {
      throw new AppError(
        ERROR_MSGS.ADMIN_REGISTRATION_APPROVAL_ERROR,
        HTTPCODES.BAD_REQUEST
      )
    }
  }

  async cancelAdminDocsRegistration(userId: number): Promise<void> {
    const filters = {
      id: userId,
      status: In([UserStatus.pending, UserStatus.enable])
    }
    const attributes = {
      firstName: true,
      lastName: true,
      status: true,
      email: true,
      role: true,
      id: true
    }
    const userToBeCanceled = await this.entityFactory.findOne(
      filters,
      attributes,
      false,
      false
    )

    if (!userToBeCanceled) {
      throw new AppError(
        ERROR_MSGS.ADMIN_REGISTRATION_CANCELATION_FAIL,
        HTTPCODES.NOT_FOUND
      )
    }

    await this.disableUser(Number(userId))
  }

  async createUser(user: User): Promise<UserDto> {
    const assignedUser = checkRoleForAssignment(user)
    assignedUser.password = await hashPassword(user.password)
    const userCreated = (await this.entityFactory.create(
      assignedUser,
      false
    )) as User
    return userDto(userCreated)
  }

  async signIn(loginData: Login): Promise<AuthenticatedUser> {
    const attributes = {
      id: true,
      firstName: true,
      lastName: true,
      password: true,
      role: true
    }
    const user = (await this.findUser(
      { email: loginData.email },
      attributes,
      false,
      true
    )) as User
    try {
      const [, token, isDoctor, isPatient] = await Promise.all([
        comparePasswords(loginData.password, user.password),
        generateJWT({ id: user.id }),
        doctorService.findDoctor(
          { user: { id: user.id } },
          false,
          false,
          false
        ),
        patientService.findPatient(
          { user: { id: user.id } },
          false,
          false,
          false
        )
      ])
      const userToReturn = userDto(user)

      if (isDoctor) {
        userToReturn.doctorId = isDoctor.id
      }
      if (isPatient) {
        userToReturn.patientId = isPatient.id
      }

      return {
        token,
        user: userToReturn
      }
    } catch (err) {
      if (err instanceof AppError) {
        throw err
      }
      throw new AppError(
        ERROR_MSGS.SIGNIN_FAIL,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
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
      await this.entityFactory.updateOne(data)
    } catch (e) {
      throw new AppError(
        ERROR_MSGS.PASSWORD_CHANGE_ERROR,
        HTTPCODES.BAD_REQUEST
      )
    }
  }

  async disableUser(id: number) {
    try {
      await this.entityFactory.updateOne({ id, status: UserStatus.disable })
    } catch (e) {
      throw new AppError(
        ERROR_MSGS.USER_DISABLE_ERROR,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
  }
}
