import {
  User,
  Doctor,
  MedicalAppointment,
  MedicalAppointmentDates,
  Patient
} from '../entities'
import type { UserRepository } from '../types/user.types'
import type { MedicalAppointmentRepository } from '../types/medical.appointment.types'
import type { MedicalAppointmentDatesRepository } from '../types/medical.appointment.dates.types'
import type { DoctorRepository } from '../types/doctor.types'
import { AppDataSrc } from './database/database.config'
import { DoctorService } from './doctor.service'
import { MedicalAppointmentDatesService } from './medical.appointment.dates.service'
import { UserService } from './user.service'
import { PatientService } from './patient.service'
import type { PatientRepository } from '../types/patient.types'
import { MedicalAppointmentService } from './medical.appointment.service'

export let userService: UserService,
  medicalAppointmentDatesService: MedicalAppointmentDatesService,
  doctorService: DoctorService,
  medicalAppointmentService: MedicalAppointmentService,
  patientService: PatientService

const userRepository: UserRepository = AppDataSrc.getRepository(User)

const patientRepository: PatientRepository = AppDataSrc.getRepository(Patient)

const doctorRepository: DoctorRepository = AppDataSrc.getRepository(Doctor)

const medicalAppointmentDatesRespository: MedicalAppointmentDatesRepository =
  AppDataSrc.getRepository(MedicalAppointmentDates)

const medicalAppointmentRepository: MedicalAppointmentRepository =
  AppDataSrc.getRepository(MedicalAppointment)

// const medicalRecordRepository: Repository<MedicalRecord> =
//   AppDataSrc.getRepository(MedicalRecord)

// const patientMedicalHistoryRepository: Repository<PatientMedicalHistory> =
//   AppDataSrc.getRepository(PatientMedicalHistory)

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
})()
