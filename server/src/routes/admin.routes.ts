import { Router } from 'express'
import {
  approveRejectDoctorsAndAdminsStatus,
  getAllDoctorsAndAdmins
} from '../controllers/admin.controller'
import { protect, restrictTo } from '../middlewares/auth.middleware'
import { UserRole } from '../types/user.types'

export const adminRouter = Router()

// Ruta para obtener doctores y admins
adminRouter.get(
  '/high-level-roles',
  protect,
  restrictTo(UserRole.admin),
  getAllDoctorsAndAdmins
)

// Ruta para aprobar o rechazar solicitudes de registro
adminRouter.patch(
  '/approve-or-reject/:requestId',
  protect,
  restrictTo(UserRole.admin),
  approveRejectDoctorsAndAdminsStatus
)
