import { Router } from 'express'
import {
  approveDoctorsAndAdminsRegistration,
  cancelDoctorsAndAdminsRegistration,
  getAllDoctorsAndAdmins
} from '../controllers/admin.controller'
import { protect, restrictTo } from '../middlewares/auth.middleware'
import { UserRole } from '../types/user.types'
import { schemaValidator } from '../middlewares/schema.middleware'
import { idSchema } from '../schema/id.schema'

export const adminRouter = Router()

adminRouter.use(protect, restrictTo(UserRole.admin))

adminRouter.route('/high-level-roles').get(getAllDoctorsAndAdmins) // Ruta para obtener doctores y admins

adminRouter
  .use('/high-level-roles/:id', schemaValidator(idSchema))
  .route('/high-level-roles/:id')
  .patch(approveDoctorsAndAdminsRegistration) // Ruta para aprobar solicitudes de registro
  .delete(cancelDoctorsAndAdminsRegistration) // Ruta para cambiar el estado de un doctor o admin a disable
