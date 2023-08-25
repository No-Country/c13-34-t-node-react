import { Router } from 'express'
import { getAllDoctorsAndAdmins } from '../controllers/admin.controller'

export const adminRouter = Router()

adminRouter.get('/high-level-roles', getAllDoctorsAndAdmins)
