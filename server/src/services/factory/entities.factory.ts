import {
  //   Doctor,
  //   MedicalAppointment,
  //   MedicalRecord,
  //   Patient,
  //   PatientMedicalHistory,
  User
} from '../../entities'
import { AppDataSrc } from '../database/database.config'
import { type UserRepository } from '../../types/user.types'
import { UserService } from '../user.service'

export let userService: UserService

const userRepository: UserRepository = AppDataSrc.getRepository(User)

// const patientRepository: Repository<Patient> = AppDataSrc.getRepository(Patient)

// const doctorRepository: Repository<Doctor> = AppDataSrc.getRepository(Doctor)

// const medicalAppointmentRepository: Repository<MedicalAppointment> =
//   AppDataSrc.getRepository(MedicalAppointment)

// const medicalRecordRepository: Repository<MedicalRecord> =
//   AppDataSrc.getRepository(MedicalRecord)

// const patientMedicalHistoryRepository: Repository<PatientMedicalHistory> =
//   AppDataSrc.getRepository(PatientMedicalHistory)

;(() => {
  userService = new UserService(userRepository)
})()
