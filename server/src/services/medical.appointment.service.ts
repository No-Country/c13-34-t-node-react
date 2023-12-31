import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import type { MedicalAppointment, Patient, User } from '../entities'
import type { FindResults } from '../types/entity.types'
import { MedicalAppointmentDatesStatus } from '../types/medical.appointment.dates.types'
import type { MedicalAppointmentRepository } from '../types/medical.appointment.types'
import { AppError } from '../utils/app.error'
import { medicalAppointmentDatesService, patientService } from './'
import { EntityFactory } from './factory/entity.factory'

export class MedicalAppointmentService {
  private readonly entityFactory: EntityFactory

  constructor(medicalAppointmentRepository: MedicalAppointmentRepository) {
    this.entityFactory = new EntityFactory(medicalAppointmentRepository)
  }

  async createMedicalAppointment(
    sessionUser: User,
    medicalAppoinmentDateId: number,
    doctorId: number,
    description: string
  ): Promise<any> {
    // buscar la fecha de la cita y cambiar/actualizar su estado a selected
    const medicalAppointmentsSelectedExists = await this.findMedicalAppointment(
      {
        patient: { user: { id: sessionUser.id } },
        medicalAppoinmentDate: {
          status: MedicalAppointmentDatesStatus.selected,
          doctor: { id: doctorId }
        }
      },
      false,
      false,
      false
    )

    if (medicalAppointmentsSelectedExists) {
      throw new AppError(
        ERROR_MSGS.MEDICAL_APPOINTMENT_SELECTED_EXISTS,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }

    const medicalAppointmentDate =
      await medicalAppointmentDatesService.findMedicalAppointmentDate(
        {
          id: medicalAppoinmentDateId,
          status: MedicalAppointmentDatesStatus.pending
        },
        false,
        { doctor: true },
        false
      )
    if (!medicalAppointmentDate)
      throw new AppError(
        ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_NOT_EXISTS_OR_CANCELLED_OR_COMPLETED,
        HTTPCODES.NOT_FOUND
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
      const patientExists = await patientService.findPatient(
        { user: { id: sessionUser.id } },
        false,
        { user: true, medicalAppointments: true },
        false
      )
      if (patientExists) {
        patient = patientExists
      } else {
        patient = await patientService.createPatient(patientToCreate)
      }
    } catch (err) {
      throw new AppError(
        ERROR_MSGS.CREATE_PATIENT_ERROR,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    }
    // crear un objeto para la tabla de medicalAppointment, asignarle en la clave medicalAppointmentDate la fecha que buscamos y actualizamos su estado
    // en el objeto para la tabla medicalAppointment asignarle en la clave patient, el paciente que creamos
    const medicalAppoinmentToCreate = {
      description,
      medicalAppointmentDate,
      patient
    } as MedicalAppointment
    // devolver la cita creada
    return {
      medicalAppointment: (await this.entityFactory.create(
        medicalAppoinmentToCreate,
        false
      )) as MedicalAppointment,
      patientId: patient.id
    }
  }

  async findMedicalAppointment(
    filters: object,
    attributes: object | false,
    relationAttributes: object | false,
    error: boolean
  ): Promise<MedicalAppointment> {
    return (await this.entityFactory.findOne(
      filters,
      attributes,
      relationAttributes,
      error
    )) as MedicalAppointment
  }

  async findMedicalAppointments(
    filters: object,
    attributes: object | false,
    relationAttributes: object | false
  ): Promise<FindResults> {
    return await this.entityFactory.findAll(
      filters,
      attributes,
      relationAttributes
    )
  }
}
