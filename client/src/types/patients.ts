import { TUser } from "./user";

export interface TPatientMedicalHistoryInfo {
  id: number;
  date: string;
  notes: string;
  symptoms: string;
  treatments: string;
  medication: string;
  height: number;
  bloodPressure: string;
  weight: number;
}

export interface TPatientInfo {
  status: string;
  patientInfo: TPatient;
  medicalRecordInfo: TMedicalRecordInfo;
  patientMedicalHistories: {
    patientMedicalHistoryInfo: TPatientMedicalHistoryInfo[];
    count: number;
  };
}

export interface TPatient {
  id: number;
  user: TUser;
}

export interface TMedicalRecordInfo {
  id: number;
  date: string;
  allergies: string;
  previousMedicalConditions: string;
  familyMedicalHistory: string;
}
