import { User } from '../entities'
import { UserStatus } from '../types/user.types'
import { highLevelRoles } from './high.level.roles'

export const checkRoleForAssignment = (user: User) => {
  if (highLevelRoles.includes(user.role)) {
    user.status = UserStatus.disable
  }
  return user
}