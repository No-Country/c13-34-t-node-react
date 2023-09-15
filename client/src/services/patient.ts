import { client } from "@/config/client";

import { TGetPatientInfo } from "@/types/patient";

async function getPatientInfo() {
  type TGetData = {
    status: string;
    patient: {
      id: number;
    };
  };

  const { data } = await client.get<TGetData>(
    "/api/v1/patients/medical-appointment",
  );

  const res = await client.get<TGetPatientInfo>(
    "/api/v1/patients/get-patient-info/" + data.patient.id,
  );

  return res.data;
}

export const PatientService = {
  getPatientInfo,
};
