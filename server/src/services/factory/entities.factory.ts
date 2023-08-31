import { User, MedicalAppointmentDates } from '../../entities'
import { type UserRepository } from '../../types/user.types'
import { type MedicalAppointmentDatesRepository } from '../../types/medical.appointment.dates.types'
import { AppDataSrc } from '../database/database.config'
import { UserService } from '../user.service'
import { MedicalAppointmentDatesService } from '../medical.appointment.dates.service'

export let userService: UserService,
  medicalAppointmentDatesService: MedicalAppointmentDatesService

const userRepository: UserRepository = AppDataSrc.getRepository(User)

// const patientRepository: Repository<Patient> = AppDataSrc.getRepository(Patient)

// const doctorRepository: Repository<Doctor> = AppDataSrc.getRepository(Doctor)

const medicalAppointmentDatesRespository: MedicalAppointmentDatesRepository =
  AppDataSrc.getRepository(MedicalAppointmentDates)

// const medicalAppointmentRepository: Repository<MedicalAppointment> =
//   AppDataSrc.getRepository(MedicalAppointment)

// const medicalRecordRepository: Repository<MedicalRecord> =
//   AppDataSrc.getRepository(MedicalRecord)

// const patientMedicalHistoryRepository: Repository<PatientMedicalHistory> =
//   AppDataSrc.getRepository(PatientMedicalHistory)

;(() => {
  userService = new UserService(userRepository)
  medicalAppointmentDatesService = new MedicalAppointmentDatesService(
    medicalAppointmentDatesRespository
  )
})()
