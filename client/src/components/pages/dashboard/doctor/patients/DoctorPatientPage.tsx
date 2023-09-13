import { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { GiBodyHeight } from "react-icons/Gi";
import { GrAddCircle } from "react-icons/gr";
import useSWR from "swr";
import { DoctorPatientsService } from "@/services/doctorPatients";
import { useParams } from "react-router-dom";
import { TPatientInfo } from "@/types/patients";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import clsx from "clsx";
import { getAge } from "@/data/functions";
import { useAuth } from "@/context/auth";
import { Modal } from "@/components/common/Modal";

const getPatientInfo = "getPatientInfo";
const getPatientAppointmentsQty = "getPatientAppointmentsQty";

export const DoctorPatientPage = () => {
  const { userId } = useParams();
  const [show, setShow] = useState(false);
  /*const auth = useAuth();
  const user = auth.user;
  console.log(user);*/

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = useSWR([getPatientInfo, userId], ([_url, userId]) =>
    DoctorPatientsService.getPatientInfo(Number(userId)),
  );
  const [patient, setPatient] = useState<TPatientInfo | null>(null);
  /*const { appData } = useSWR(
    [getPatientAppointmentsQty, userId, patient],
    ([_url, userId, patient]) =>
      DoctorPatientsService.getPatientAppointmentsQty(
        userId,
        patient?.patientInfo.user.id,
      ),
  );*/

  const handleMedicalRecordSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const previousMedicalConditions = formData.get(
      "previousMedicalConditions",
    ) as string;
    const familyMedicalHistory = formData.get("familyMedicalHistory") as string;
    const allergies = formData.get("allergies") as string;

    patient &&
      DoctorPatientsService.postMedicalRecord(
        patient?.patientInfo.id,
        familyMedicalHistory,
        previousMedicalConditions,
        allergies,
      );
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setPatient(data);
    }
  }, [data]);

  return patient ? (
    <div className="bg-gray-200 h-full flex flex-col">
      <Modal
        showModal={show}
        onClose={() => setShow(false)}
        message={
          <div className="text-center flex flex-col justify-start px-12 gap-4">
            <p className=" border-b-2 border-slate-200 p-0">
              Agregar registro médico
            </p>
            <form
              onSubmit={handleMedicalRecordSubmit}
              className="flex flex-col gap-4 justify-center text-center"
            >
              <label className="">
                <p className="text-sm w-">Patologías preexistentes *</p>
                <textarea
                  id="previousMedicalConditions"
                  name="previousMedicalConditions"
                  rows={4}
                  required
                  className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
                />
              </label>
              <label className="">
                <p className="text-sm w-">Alergias *</p>
                <textarea
                  id="allergies"
                  name="allergies"
                  rows={4}
                  required
                  className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
                />
              </label>
              <label className="">
                <p className="text-sm w-">Antecedentes familiares *</p>
                <textarea
                  id="familyMedicalHistory"
                  name="familyMedicalHistory"
                  rows={4}
                  required
                  className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
                />
              </label>
              <button
                type="submit"
                className="disabled:bg-slate-300 hover:opacity-90 self-center w-1/2 bg-dark-green text-white rounded-xl py-1 px-2"
              >
                Enviar
              </button>
            </form>
          </div>
        }
      />
      <div className="bg-white px-8 pt-10 pb-4 flex justify-between">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-lg font-bold uppercase">Paciente</h2>
          <MdOutlineArrowForwardIos color="gray" size={25} />
          <p className="text-slate-500 capitalize font-bold text-lg">
            {patient.patientInfo.user.firstName +
              " " +
              patient.patientInfo.user.lastName}
          </p>
        </div>
        <div>Notificación</div>
      </div>
      <div className="flex h-1/2 justify-around items-start">
        <div className="flex w-1/2 flex-col gap-2">
          <div className="flex w-full gap-3">
            <div className="bg-white h-80 my-6 p-4 w-fit flex flex-col gap-4 justify-center items-center rounded-xl drop-shadow-xl border-2 border-dark-green">
              <div className="w-[80px] h-[80px] flex justify-center items-center border-2 border-slate-300 p-2 rounded-full">
                <AiOutlineUser size={80} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-black capitalize font-bold text-xl">
                  {patient.patientInfo.user.firstName +
                    " " +
                    patient.patientInfo.user.lastName}
                </p>
                <p className="text-slate-400 font-bold text-lg">
                  {patient.patientInfo.user.email}
                </p>
              </div>
              <div className="flex">
                <div className="border-r-2 border-solid-black p-4 flex flex-col items-center justify-center">
                  <p className="text-xl font-bold"> 5 </p>
                  <p> realizadas </p>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <p className="text-xl font-bold"> 2 </p>
                  <p> pendientes </p>
                </div>
              </div>
            </div>
            <div className="w-max border-2 border-dark-green h-80 gap-3 flex-wrap items-center justify-center bg-white my-6 p-2 flex rounded-xl drop-shadow-xl">
              <div className="w-52 flex flex-col items-center justify-center gap-1 border-b-2 border-slate-300 p-1">
                <p className="font-bold text-md text-slate-500">Género</p>
                <p className="text-md">
                  {patient.patientInfo.user.genre === "male"
                    ? "Masculino"
                    : "Femenino"}
                </p>
              </div>
              <div className="w-52 flex flex-col items-center justify-center gap-1 border-b-2 border-slate-300 p-1">
                <p className="font-bold text-md text-slate-500">Teléfono</p>
                <p className="text-md">{patient.patientInfo.user.telephone}</p>
              </div>
              <div className="w-52 flex flex-col items-center justify-center gap-1 border-b-2 border-slate-300 p-1">
                <p className="font-bold text-md text-slate-500">
                  Fecha nacimiento
                </p>
                <p className="text-md">
                  {patient.patientInfo.user.dateOfBirth}
                </p>
              </div>
              <div className="w-52 flex flex-col items-center justify-center gap-1 border-b-2 border-slate-300 p-1">
                <p className="font-bold text-md text-slate-500">Fecha inicio</p>
                <p className="text-md">04/08/2022</p>
              </div>
            </div>
            <div className="w-1/7 h-80 flex-wrap items-center justify-center gap-4 my-6 flex flex-col">
              <div className="flex w-full items-center justify-center gap-2">
                <div className="w-fit h-20 bg-white p-5 flex flex-col items-center justify-center rounded-xl drop-shadow-xl border-2 border-dark-green">
                  <p className="text-md font-bold text-slate-400">Edad</p>
                  <p className="text-md font-bold ">
                    {getAge(patient.patientInfo.user.dateOfBirth)}
                  </p>
                </div>
                <div className="w-max h-20 bg-white p-5 flex flex-col items-center justify-center rounded-xl drop-shadow-xl border-2 border-dark-green">
                  <p className="text-md font-bold text-slate-400">Peso</p>
                  <p className="text-md font-bold ">
                    {patient.patientMedicalHistories
                      .patientMedicalHistoryInfo !== null
                      ? patient.patientMedicalHistories
                          .patientMedicalHistoryInfo[0].weight
                      : ""}{" "}
                    kg
                  </p>
                </div>
              </div>
              <div className="w-full h-20 bg-white flex-wrap items-center justify-center gap-1 my-auto p-5 flex rounded-xl drop-shadow-xl border-2 border-dark-green">
                <GiBodyHeight size={40} color="grey" />
                <p className="text-md font-bold ">
                  {patient.patientMedicalHistories.patientMedicalHistoryInfo !==
                  null
                    ? patient.patientMedicalHistories
                        ?.patientMedicalHistoryInfo[0].height
                    : ""}{" "}
                  cm
                </p>
              </div>
              <div className="w-full bg-white p-4 flex flex-col items-center justify-center rounded-xl drop-shadow-xl border-2 border-dark-green">
                <p className="text-md font-bold text-slate-400">
                  Presión arterial
                </p>
                <p className="text-md font-bold ">
                  {patient.patientMedicalHistories.patientMedicalHistoryInfo !==
                  null
                    ? patient.patientMedicalHistories
                        ?.patientMedicalHistoryInfo[0].bloodPressure
                    : ""}{" "}
                  mm/Hg
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-4/5 my-6 rounded-xl drop-shadow-xl">
          <div className=" bg-dark-green p-4 px-32 gap-4 border-2 border-b-slate-500 rounded-t-xl">
            <p className="text-lg text-white font-bold text-center">
              Registro médico
            </p>
          </div>
          {patient.patientMedicalHistories.patientMedicalHistoryInfo !==
          null ? (
            <div className="max-w-md">
              <div className="flex gap-2 items-center border-2 border-slate-300">
                <p className="w-32 h-20 flex items-center font-bold text-slate-500 border-r-2 p-2 border-slate-300">
                  Patologías
                </p>
                <p className="flex w-64 h-full text-sm text-ellipsis">
                  {patient.medicalRecordInfo.previousMedicalConditions}
                </p>
              </div>
              <div className="flex gap-2 items-center border-2 border-slate-300">
                <p className="w-32 h-20 flex items-center font-bold text-slate-500 border-r-2 p-2 border-slate-300">
                  Alergias
                </p>
                <p className="flex w-64 h-full text-sm text-ellipsis">
                  {patient.medicalRecordInfo.allergies}
                </p>
              </div>
              <div className="flex gap-2 items-center border-2 border-slate-300">
                <p className="w-32 font-bold text-slate-500 border-r-2 p-2 border-slate-300">
                  Antecedentes familiares
                </p>
                <p className="flex w-64 h-full text-sm text-ellipsis">
                  {patient.medicalRecordInfo.familyMedicalHistory}
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-4/5 flex items-center justify-center">
              <button
                onClick={() => setShow(true)}
                className="m-auto hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex gap-2 items-center border-2 border-dark-green"
              >
                <GrAddCircle size={30} />
                <span className="text-dark-green">Agregar</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className={clsx(
          "rounded-xl w-4/5 drop-shadow-xl self-center",
          patient.patientMedicalHistories.patientMedicalHistoryInfo === null &&
            "opacity-50",
        )}
      >
        <div className="w-full bg-dark-green p-4 gap-4 border-2 border-b-slate-500 rounded-t-xl">
          <p className="text-lg text-white font-bold text-center">
            Historial médico
          </p>
        </div>
        {patient.patientMedicalHistories.patientMedicalHistoryInfo !== null ? (
          <table className="table-auto bg-white w-full h-3/4 p-2 border-2 border-b-slate-500 border-separate border-spacing-1">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Notas</th>
                <th>Síntomas</th>
                <th>Tratamiento</th>
                <th>Medicación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="whitespace-nowrap text-sm">
                  {
                    patient.patientMedicalHistories.patientMedicalHistoryInfo[0]
                      .date
                  }
                </td>
                <td className="p-2 text-sm">
                  {
                    patient.patientMedicalHistories.patientMedicalHistoryInfo[0]
                      .notes
                  }
                </td>
                <td className="text-sm">
                  {
                    patient.patientMedicalHistories.patientMedicalHistoryInfo[0]
                      .symptoms
                  }
                </td>
                <td className="text-sm">
                  {
                    patient.patientMedicalHistories.patientMedicalHistoryInfo[0]
                      .treatments
                  }
                </td>
                <td className="text-sm">
                  {
                    patient.patientMedicalHistories.patientMedicalHistoryInfo[0]
                      .medication
                  }
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="bg-white font-bold w-full h-12 flex items-center justify-center">
            <p>Debes completar primero el registro médico</p>
          </div>
        )}
        <div className="flex p-2 items-center justify-center bg-white gap-4 border-2 border-b-slate-500">
          <button
            disabled={
              patient.patientMedicalHistories.patientMedicalHistoryInfo === null
            }
            className={clsx(
              "m-auto hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex gap-2 items-center border-2 border-dark-green",
              patient.patientMedicalHistories.patientMedicalHistoryInfo ===
                null && "hover:bg-transparent",
            )}
          >
            <GrAddCircle size={30} />
            <span className="text-dark-green">Agregar</span>
          </button>
        </div>
      </div>
    </div>
  ) : error ? (
    <div> Ha ocurrido un error</div>
  ) : (
    <div className="h-full w-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};
