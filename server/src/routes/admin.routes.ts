import { Router } from 'express'
import {
  approveDoctorsAndAdminsRegistration,
  getAllDoctorsAndAdmins,
  revertDoctorsAndAdminsRegistration
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

// Ruta para aprobar solicitudes de registro
adminRouter.patch(
  '/approve-registration/:userId',
  protect,
  restrictTo(UserRole.admin),
  approveDoctorsAndAdminsRegistration
)

// Ruta para cambiar el estado de un doctor o admin a disable
adminRouter.delete(
  '/remove-registration/:userId',
  protect,
  restrictTo(UserRole.admin),
  revertDoctorsAndAdminsRegistration
)
