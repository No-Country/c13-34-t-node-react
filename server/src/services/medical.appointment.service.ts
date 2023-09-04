import { MedicalAppointmentRepository } from '../types/medical.appointment.types'
import { EntityService } from './entity.service'

export class MedicalAppointmentService {
  private readonly entityService: EntityService

  constructor(medicalAppointmentRepository: MedicalAppointmentRepository) {
    this.entityService = new EntityService(medicalAppointmentRepository)
  }

  async createMedicalAppointment(
    sessionUser: object,
    medicalAppoinmentDateId: number
  ) {
    //buscar la fecha de la cita y cambiar/actualizar su estado a selected
    //crear un objeto para la tabla de patients, y asignarle el sessionUser en la clave user de ese objeto
    //crear el paciente en la tabla de patients
    //crear un objeto para la tabla de medicalAppointment, asignarle en la clave medicalAppointmentDate la fecha que buscamos y actualizamos su estado
    //en el objeto para la tabla medicalAppointment asignarle en la clave patient, el paciente que creamos
    //devolver la cita creada
  }
}
