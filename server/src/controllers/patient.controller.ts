import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
import { medicalAppointmentService, patientService } from '../services'
import { AppError } from '../utils/app.error'
import { MedicalAppointmentDatesStatus } from '../types/medical.appointment.dates.types'

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionUser } = req
    const [patients, results] = await patientService.findPatients(
      {
        medicalAppointments: {
          medicalAppointmentDate: {
            doctor: {
              user: {
                id: sessionUser?.id
              }
            }
          }
        }
      },
      {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          dateOfBirth: true,
          telephone: true,
          genre: true
        }
      },
      {
        user: true
      }
    )

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      patients,
      results
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.PATIENT_INFO_FAIL,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

export const getPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // obtener el id del paciente
    const { sessionUser } = req
    const patient = await patientService.findPatient(
      { user: { id: sessionUser?.id } },
      false,
      {
        medicalAppointments: {
          medicalAppointmentDate: {
            doctor: { user: true }
          }
        }
      },
      true
    )

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      patient
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.PATIENT_NOT_FOUND,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

export const getMedicalAppointmentsInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { doctorId, patientId } = req.safeData?.params
    const [, completedMedicalAppointments] =
      await medicalAppointmentService.findMedicalAppointments(
        {
          patient: {
            user: {
              id: patientId
            }
          },
          medicalAppointmentDate: {
            status: MedicalAppointmentDatesStatus.completed,
            doctor: {
              id: doctorId
            }
          }
        },
        false,
        false
      )

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      completedMedicalAppointments
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.MEDICAL_APPOINTMENTS_INFO_FAIL,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

// Cancelar cita de parte del paciente

export const cancelPatientAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.safeData?.params

    await patientService.cancelPatientAppointment(id)

    return res.status(HTTPCODES.NO_CONTENT).json({
      status: MESSAGES.SUCCESS
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.MEDICAL_APPOINTMENT_DATES_INVALID_TYPE,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

export const patientInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.safeData?.params
    const { patientInfo, medicalRecordInfo, patientMedicalHistories } =
      await patientService.getPatientInfo(id)

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      patientInfo,
      medicalRecordInfo,
      patientMedicalHistories
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.PATIENT_INFO_FAIL,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}
