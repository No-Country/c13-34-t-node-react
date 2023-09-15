import { PatientService } from "@/services/patient";
import useSWR from "swr";
import { Error } from "../../shared/Error";
import { Loading } from "../../shared/Loading";
import { useAuth } from "@/context/auth";

const getPatientInfoKey = "getPatientInfo";

export const PatientMedicalRecordsPage = () => {
  const { user } = useAuth();

  const { data, error, isLoading } = useSWR(
    user!.patientId ? getPatientInfoKey : null,
    () => PatientService.getPatientInfo(user!.patientId),
  );

  if (isLoading) return <Loading />;
  if (error || !data)
    return (
      <Error
        message={"USTED AUN NO TIENE REGISTROS MÉDICOS"}
        linkText="Reserve su cita Aquí"
        linkTo="/plataforma/paciente/reservar-cita"
      />
    );

  const { patientInfo, medicalRecordInfo } = data;

  return (
    <div className="bg-gray-50">
      <div className="bg-dark-green h-52 flex flex-col gap-8">
        <div className="text-white px-5 2xl:px-10 pt-10 grid grid-cols-2 2xl:flex justify-between text-lg font-bold gap-8 uppercase">
          <h2>Mis registros médicos</h2>
          <h2>Notificación</h2>
        </div>

        {/* patientInfo */}
        {patientInfo && (
          <div className="bg-white mx-4 2xl:mx-8 px-4 py-8 2xl:p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl 2xl:text-2xl text-dark-green font-bold pb-4">
              Información personal del paciente
            </h2>

            <div className="overflow-auto">
              <table className="table-auto bg-white px-4 py-8 w-full">
                <thead className="bg-white border-b-2 border-gray-200">
                  <tr>
                    <th className="p-3 w-8 text-sm font-semibold tracking-wide text-left uppercase">
                      No.
                    </th>
                    <th className="p-3 w-52 text-sm font-semibold tracking-wide text-left uppercase">
                      Nombres
                    </th>
                    <th className="p-3 w-52 text-sm font-semibold tracking-wide text-left uppercase">
                      Apellidos
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Correo
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Fecha de Nacimiento
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Teléfono
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Genero
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {patientInfo.id}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {patientInfo.user.firstName}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {patientInfo.user.lastName}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {patientInfo.user.email}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {patientInfo.user.dateOfBirth}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {patientInfo.user.telephone}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {patientInfo.user.genre}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* medicalRecordInfo */}
        <div className="bg-white mx-4 2xl:mx-8 px-4 py-8 2xl:p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl 2xl:text-2xl text-dark-green font-bold pb-4">
            información de registro médico
          </h2>

          <div className="overflow-auto">
            <table className="table-auto bg-white px-4 py-8 w-full">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 w-8 text-sm font-semibold tracking-wide text-left uppercase">
                    No.
                  </th>
                  <th className="p-3 w-52 text-sm font-semibold tracking-wide text-left uppercase">
                    Fecha
                  </th>
                  <th className="p-3 w-52 text-sm font-semibold tracking-wide text-left uppercase">
                    Alergias
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Condiciones Médicas Previas
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Historia médica familiar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {medicalRecordInfo.id}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {medicalRecordInfo.date}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {medicalRecordInfo.allergies}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {medicalRecordInfo.previousMedicalConditions}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {medicalRecordInfo.familyMedicalHistory}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* patientMedicalHistories: {patientMedicalHistoryInfo} */}
        <div className="bg-white mx-4 2xl:mx-8 px-4 pt-8 pb-20 2xl:p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl 2xl:text-2xl text-dark-green font-bold pb-4">
            Información del historial médico del paciente
          </h2>

          <div className="overflow-auto">
            <table className="table-auto bg-white px-4 py-8 w-full">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 w-8 text-sm font-semibold tracking-wide text-left uppercase">
                    No.
                  </th>
                  <th className="p-3 w-52 text-sm font-semibold tracking-wide text-left uppercase">
                    Fecha
                  </th>
                  <th className="p-3 w-52 text-sm font-semibold tracking-wide text-left uppercase">
                    Notas
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Síntomas
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Tratamientos
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Medicamento
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Talla
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Peso
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Presión arterial
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.patientMedicalHistories.patientMedicalHistoryInfo.map(
                  (info) => (
                    <tr key={info.id} className="bg-white">
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {info.id}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {info.date}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {info.notes}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {info.symptoms}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {info.treatments}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {info.medication}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {info.height}cm
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {info.weight}kg
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {info.bloodPressure}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
