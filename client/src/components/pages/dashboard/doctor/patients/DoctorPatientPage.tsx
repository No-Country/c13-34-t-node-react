import { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AiOutlineUser, AiFillEdit } from "react-icons/ai";
import { GiBodyHeight } from "react-icons/Gi";
import { GrAddCircle } from "react-icons/gr";
import useSWR from "swr";
import { DoctorPatientsService } from "@/services/doctorPatients";
import { useParams } from "react-router-dom";
import { TPatientInfo } from "@/types/patients";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import clsx from "clsx";
import { getAge } from "@/data/functions";
import { Modal } from "@/components/common/Modal";
import { EditMedicalRecordModalContent } from "./EditMedicalRecordModalContent";
import { AddMedicalRecordModalContent } from "./AddMedicalRecordModalContent copy";
import { AddHistory } from "./AddHistory";

const getPatientInfo = "getPatientInfo";

export const DoctorPatientPage = () => {
  const { userId } = useParams();
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const { data, mutate, error } = useSWR(
    [getPatientInfo, userId],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_url, userId]) => DoctorPatientsService.getPatientInfo(Number(userId)),
  );
  const [patient, setPatient] = useState<TPatientInfo | null>(null);

  const handleMedicalRecordSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setisLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const previousMedicalConditions = formData.get(
      "previousMedicalConditions",
    ) as string;
    const familyMedicalHistory = formData.get("familyMedicalHistory") as string;
    const allergies = formData.get("allergies") as string;
    const notes = formData.get("notes") as string;
    const symptoms = formData.get("symptoms") as string;
    const treatments = formData.get("treatments") as string;
    const medication = formData.get("medication") as string;
    const height = formData.get("height") as string;
    const bloodPressureSis = formData.get("bloodPressureSis") as string;
    const bloodPressureDias = formData.get("bloodPressureDias") as string;
    const weight = formData.get("weight");

    if (patient && variant === "addMedicalRecord") {
      const res = await DoctorPatientsService.postMedicalRecord(
        patient?.patientInfo.id,
        familyMedicalHistory,
        previousMedicalConditions,
        allergies,
      );
      if (res.status === 201) {
        setShowError(false);
        await mutate();
        setisLoading(false);
        setShow(false);
      } else {
        setisLoading(false);
        setShowError(true);
      }
    }

    if (patient && variant === "editMedicalRecord") {
      const res = await DoctorPatientsService.editMedicalRecord(
        patient.medicalRecordInfo.id,
        familyMedicalHistory,
        previousMedicalConditions,
        allergies,
      );
      if (res.status === 204) {
        setShowError(false);
        await mutate();
        setisLoading(false);
        setShow(false);
      } else {
        setisLoading(false);
        setShowError(true);
      }
    }

    if (patient && variant === "addMedicalHistory") {
      const res = await DoctorPatientsService.postMedicalHistory(
        patient.medicalRecordInfo.id,
        notes,
        symptoms,
        treatments,
        medication,
        Number(height),
        bloodPressureSis + "/" + bloodPressureDias,
        Number(weight),
      );
      if (res.status === 201) {
        setShowError(false);
        await mutate();
        setisLoading(false);
        setShow(false);
      } else {
        setisLoading(false);
        setShowError(true);
      }
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setPatient(data);
    }
  }, [data]);

  return patient ? (
    <div className="bg-gray-200 h-max min-h-screen flex flex-col">
      <Modal
        showModal={show}
        onClose={() => {
          setShow(false);
          setShowError(false);
        }}
        message={
          variant === "editMedicalRecord" ? (
            <EditMedicalRecordModalContent
              handleMedicalRecordSubmit={handleMedicalRecordSubmit}
              patient={patient}
              showError={showError}
              isLoading={isLoading}
            />
          ) : variant === "addMedicalRecord" ? (
            <AddMedicalRecordModalContent
              handleMedicalRecordSubmit={handleMedicalRecordSubmit}
              patient={patient}
              showError={showError}
              isLoading={isLoading}
            />
          ) : (
            <AddHistory
              handleMedicalRecordSubmit={handleMedicalRecordSubmit}
              showError={showError}
              isLoading={isLoading}
            />
          )
        }
      />
      <div className="bg-white px-6 pt-10 pb-4 flex">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-lg font-bold uppercase">Registro médico</h2>
          <MdOutlineArrowForwardIos color="gray" className="text-xl" />
          <p className="text-slate-500 capitalize font-bold text-lg">
            {patient.patientInfo.user.firstName +
              " " +
              patient.patientInfo.user.lastName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 px-4 2xl:p-8 gap-4 2xl:gap-8">
        <div className="flex flex-row max-sm:grid max-sm:grid-cols-1 gap-3">
          <div className="bg-white h-80 max-sm:w-full my-2 2xl:my-6 p-4 w-fit flex flex-col gap-4 justify-center items-center rounded-xl drop-shadow-xl border-2 border-dark-green">
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
          <div className="max-sm:flex-col max-sm:w-full w-max border-2 border-dark-green h-80 gap-3 flex-wrap items-center justify-center bg-white 2xl:my-6 p-2 flex rounded-xl drop-shadow-xl">
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
              <p className="text-md">{patient.patientInfo.user.dateOfBirth}</p>
            </div>
            <div className="w-52 flex flex-col items-center justify-center gap-1 border-b-2 border-slate-300 p-1">
              <p className="font-bold text-md text-slate-500">Fecha inicio</p>
              <p className="text-md">04/08/2022</p>
            </div>
          </div>
          <div className="max-sm:w-full 2xl:w-1/7 2xl:h-80 flex-wrap items-center justify-center gap-2 2xl:gap-4 2xl:my-6 flex flex-col">
            <div className="flex w-full items-center justify-between 2xl:justify-center gap-2">
              <div className="max-sm:w-full w-fit h-20 bg-white p-5 flex flex-col items-center justify-center rounded-xl drop-shadow-xl border-2 border-dark-green">
                <p className="text-md font-bold text-slate-400">Edad</p>
                <p className="text-md font-bold ">
                  {getAge(patient.patientInfo.user.dateOfBirth)}
                </p>
              </div>
              <div className="max-sm:w-full w-max h-20 bg-white p-5 flex flex-col items-center justify-center rounded-xl drop-shadow-xl border-2 border-dark-green">
                <p className="text-md font-bold text-slate-400">Peso</p>
                <p className="text-md font-bold ">
                  {patient.patientMedicalHistories.patientMedicalHistoryInfo !==
                  null
                    ? patient.patientMedicalHistories.patientMedicalHistoryInfo[
                        patient.patientMedicalHistories
                          ?.patientMedicalHistoryInfo.length - 1
                      ]?.weight
                    : ""}{" "}
                  kg
                </p>
              </div>
            </div>
            <div className="w-full h-20 bg-white flex-wrap items-center justify-center gap-1 2xl:my-auto p-5 flex rounded-xl drop-shadow-xl border-2 border-dark-green">
              <GiBodyHeight size={40} color="grey" />
              <p className="text-md font-bold ">
                {patient.patientMedicalHistories.patientMedicalHistoryInfo !==
                null
                  ? patient.patientMedicalHistories?.patientMedicalHistoryInfo[
                      patient.patientMedicalHistories?.patientMedicalHistoryInfo
                        .length - 1
                    ]?.height
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
                  ? patient.patientMedicalHistories?.patientMedicalHistoryInfo[
                      patient.patientMedicalHistories?.patientMedicalHistoryInfo
                        .length - 1
                    ]?.bloodPressure
                  : ""}{" "}
                mm/Hg
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white h-4/5 2xl:my-6 rounded-xl drop-shadow-xl">
          <div className="bg-dark-green p-4 px-32 gap-4 border-2 border-b-slate-500 rounded-t-xl">
            <p className="text-lg text-white font-bold text-center">
              Registro médico
            </p>
          </div>

          {patient.patientMedicalHistories.patientMedicalHistoryInfo !==
          null ? (
            <div className="w-full max-sm:h-80">
              <div className="flex gap-2 items-center border-2 border-slate-300">
                <p className="w-36 2xl:w-32 h-20 flex items-center font-bold text-slate-500 border-r-2 p-2 border-slate-300">
                  Patologías
                </p>
                <p className="flex w-64 h-full text-sm text-ellipsis">
                  {patient.medicalRecordInfo.previousMedicalConditions}
                </p>
              </div>
              <div className="flex gap-2 items-center border-2 border-slate-300">
                <p className="w-36 2xl:w-32 h-20 flex items-center font-bold text-slate-500 border-r-2 p-2 border-slate-300">
                  Alergias
                </p>
                <p className="flex w-64 h-full text-sm text-ellipsis">
                  {patient.medicalRecordInfo.allergies}
                </p>
              </div>
              <div className="flex gap-2 items-center border-2 border-slate-300">
                <p className="w-36 2xl:w-32 font-bold text-slate-500 border-r-2 p-2 border-slate-300">
                  Antecedentes familiares
                </p>
                <p className="flex w-64 h-full text-sm text-ellipsis max-sm:line-clamp-2">
                  {patient.medicalRecordInfo.familyMedicalHistory}
                </p>
              </div>
              <div className="flex p-3 bg-white gap-2 items-center rounded-b-xl border-2 border-slate-300">
                <button
                  onClick={() => {
                    setShow(true);
                    setVariant("editMedicalRecord");
                  }}
                  className="m-auto hover:bg-gray-200 text-gray-800 font-bold px-4 rounded inline-flex gap-2 items-center border-2 border-dark-green"
                >
                  <AiFillEdit size={20} />
                  <span className="text-dark-green">Editar</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-4/5 flex items-center p-2 justify-center">
              <button
                onClick={() => {
                  setShow(true);
                  setVariant("addMedicalRecord");
                }}
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
          "rounded-xl w-full px-4 2xl:p-8 drop-shadow-xl self-center",
          patient.patientMedicalHistories.patientMedicalHistoryInfo === null &&
            "opacity-50",
        )}
      >
        <div className="2xl:w-full bg-dark-green p-3 gap-4 border-1 border-b-slate-500 rounded-t-xl">
          <p className="text-lg text-white font-bold text-center">
            Historial médico
          </p>
        </div>
        <div className="overflow-auto">
          {patient.patientMedicalHistories.patientMedicalHistoryInfo !==
          null ? (
            <table className="table-auto bg-white w-full p-2 border-2 border-b-slate-500 2xl:border-separate 2xl:border-spacing-1">
              <thead>
                <tr>
                  <th className="p-2">Fecha</th>
                  <th className="p-2">Notas</th>
                  <th className="p-2">Síntomas</th>
                  <th className="p-2">Tratamiento</th>
                  <th className="p-2">Medicación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {patient.patientMedicalHistories.patientMedicalHistoryInfo.map(
                  (row) => (
                    <tr>
                      <td className="p-2 whitespace-nowrap text-sm">
                        {row?.date}
                      </td>
                      <td className="p-2 text-sm">{row?.notes}</td>
                      <td className="p-2 text-sm">{row?.symptoms}</td>
                      <td className="p-2 text-sm">{row?.treatments}</td>
                      <td className="p-2 text-sm">{row?.medication}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          ) : (
            <div className="bg-white font-bold w-full h-12 flex items-center justify-center">
              <p>Debes completar primero el registro médico</p>
            </div>
          )}
        </div>

        <div className="flex p-2 max-sm:mb-20 2xl:p-1 items-center justify-center bg-white gap-4 border-2 border-b-slate-500 rounded-b-xl">
          <button
            disabled={
              patient.patientMedicalHistories.patientMedicalHistoryInfo === null
            }
            onClick={() => {
              setShow(true);
              setVariant("addMedicalHistory");
            }}
            className={clsx(
              "m-auto hover:bg-gray-200 text-gray-800 font-bold py-1 px-4 rounded inline-flex gap-2 items-center border-2 border-dark-green",
              patient.patientMedicalHistories.patientMedicalHistoryInfo ===
                null && "hover:bg-transparent",
            )}
          >
            <GrAddCircle size={25} />
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
