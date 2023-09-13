import { client } from "@/config/client";

import { TGetPatientInfo } from "@/types/patient";

async function getPatientInfo(patientId: number) {
  const res = await client.get<TGetPatientInfo>(
    "/api/v1/patients/get-patient-info/" + patientId,
  );

  return res.data;
}

export const PatientService = {
  getPatientInfo,
};
