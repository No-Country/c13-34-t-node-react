import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import type { MedicalAppointment, Patient, User } from '../entities'
import { MedicalAppointmentDatesStatus } from '../types/medical.appointment.dates.types'
import type { MedicalAppointmentRepository } from '../types/medical.appointment.types'
import { AppError } from '../utils/app.error'
import { EntityService } from './entity.service'
import {
  medicalAppointmentDatesService,
  patientService
} from './factory/entities.factory'

export class MedicalAppointmentService {
  private readonly entityService: EntityService

  constructor(medicalAppointmentRepository: MedicalAppointmentRepository) {
    this.entityService = new EntityService(medicalAppointmentRepository)
  }

  async createMedicalAppointment(
    sessionUser: User,
    medicalAppoinmentDateId: number,
    description: string
  ): Promise<MedicalAppointment> {
    const medicalAppointmentDate =
      await medicalAppointmentDatesService.findMedicalAppointmentDate(
        { id: medicalAppoinmentDateId },
        false,
        { patient: true },
        { doctor: true },
        true
      )
    medicalAppointmentDate.status = MedicalAppointmentDatesStatus.selected

    try {
      await medicalAppointmentDatesService.updateMedicalAppointmentDate(
        medicalAppointmentDate
      )
    } catch (err) {
      throw new AppError(
        ERROR_MSGS.MEDICAL_APPOINTMENT_FAIL_UPDATE,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
    // crear un objeto para la tabla de patients, y asignarle el sessionUser en la clave user de ese objeto
    const patientToCreate = {
      user: sessionUser
    } as Patient
    // crear el paciente en la tabla de patients
    let patient: Patient | undefined
    try {
      patient = await patientService.createPatient(patientToCreate)
    } catch (err) {
      throw new AppError(
        ERROR_MSGS.CREATE_PATIENT_ERROR,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
    // crear un objeto para la tabla de medicalAppointment, asignarle en la clave medicalAppointmentDate la fecha que buscamos y actualizamos su estado
    // en el objeto para la tabla medicalAppointment asignarle en la clave patient, el paciente que creamos
    const medicalAppoinment = {
      description,
      medicalAppointmentDate,
      patient
    } as MedicalAppointment
    // devolver la cita creada
    return (await this.entityService.create(
      medicalAppoinment
    )) as MedicalAppointment
  }
}
