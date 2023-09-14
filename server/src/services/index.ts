/**
 * Este archivo es responsable de configurar y proporcionar servicios relacionados con las entidades médicas
 * y repositorios necesarios para acceder a la base de datos.
 */
import {
  Doctor,
  MedicalAppointment,
  MedicalAppointmentDates,
  MedicalRecord,
  Patient,
  PatientMedicalHistory,
  User
} from '../entities'
import type { DoctorRepository } from '../types/doctor.types'
import type { MedicalAppointmentDatesRepository } from '../types/medical.appointment.dates.types'
import type { MedicalAppointmentRepository } from '../types/medical.appointment.types'
import type { MedicalRecordRepository } from '../types/medical.record.types'
import type { PatientMedicalHistoryRepository } from '../types/patient.medical.history.types'
import type { PatientRepository } from '../types/patient.types'
import type { UserRepository } from '../types/user.types'
import { AppDataSrc } from './database/database.config'
import { DoctorService } from './doctor.service'
import { MedicalAppointmentDatesService } from './medical.appointment.dates.service'
import { MedicalAppointmentService } from './medical.appointment.service'
import { MedicalRecordService } from './medical.records.service'
import { PatientMedicalHistoryService } from './patient.medical.history.service'
import { PatientService } from './patient.service'
import { UserService } from './user.service'

export let userService: UserService,
  medicalAppointmentDatesService: MedicalAppointmentDatesService,
  doctorService: DoctorService,
  medicalAppointmentService: MedicalAppointmentService,
  patientService: PatientService,
  medicalRecordService: MedicalRecordService,
  patientMedicalHistoryService: PatientMedicalHistoryService

// Obtención de repositorios de la base de datos
const userRepository: UserRepository = AppDataSrc.getRepository(User)
const patientRepository: PatientRepository = AppDataSrc.getRepository(Patient)
const doctorRepository: DoctorRepository = AppDataSrc.getRepository(Doctor)
const medicalAppointmentDatesRespository: MedicalAppointmentDatesRepository =
  AppDataSrc.getRepository(MedicalAppointmentDates)
const medicalAppointmentRepository: MedicalAppointmentRepository =
  AppDataSrc.getRepository(MedicalAppointment)
const medicalRecordRepository: MedicalRecordRepository =
  AppDataSrc.getRepository(MedicalRecord)
const patientMedicalHistoryRepository: PatientMedicalHistoryRepository =
  AppDataSrc.getRepository(PatientMedicalHistory)

// Inicialización de servicios con repositorios
;(() => {
  userService = new UserService(userRepository)
  medicalAppointmentDatesService = new MedicalAppointmentDatesService(
    medicalAppointmentDatesRespository
  )
  doctorService = new DoctorService(doctorRepository)
  medicalAppointmentService = new MedicalAppointmentService(
    medicalAppointmentRepository
  )
  patientService = new PatientService(patientRepository)
  medicalRecordService = new MedicalRecordService(medicalRecordRepository)
  patientMedicalHistoryService = new PatientMedicalHistoryService(
    patientMedicalHistoryRepository
  )
})()
