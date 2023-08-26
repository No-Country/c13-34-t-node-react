import { Router } from 'express'
import { getAllDoctorsAndAdmins } from '../controllers/admin.controller'
import { protect, restrictTo } from '../middlewares/auth.middleware'
import { UserRole } from '../types/user.types'

export const adminRouter = Router()

adminRouter.get(
  '/high-level-roles',
  protect,
  restrictTo(UserRole.admin),
  getAllDoctorsAndAdmins
)
