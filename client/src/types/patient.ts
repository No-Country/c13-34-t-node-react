export interface TGetPatientInfo {
  status: string;
  patientInfo: TPatientInfo;
  medicalRecordInfo: TMedicalRecordInfo;
  patientMedicalHistories: TPatientMedicalHistories;
}

export interface TMedicalRecordInfo {
  id: number;
  date: string;
  allergies: string;
  previousMedicalConditions: string;
  familyMedicalHistory: string;
}

export interface TPatientInfo {
  id: number;
  user: TUser;
}

export interface TUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  telephone: string;
  genre: string;
}

export interface TPatientMedicalHistories {
  patientMedicalHistoryInfo: TPatientMedicalHistoryInfo[];
  count: number;
}

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
