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
                          .patientMedicalHistoryInfo[
                          patient.patientMedicalHistories
                            ?.patientMedicalHistoryInfo.length - 1
                        ]?.weight
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
                        ?.patientMedicalHistoryInfo[
                        patient.patientMedicalHistories
                          ?.patientMedicalHistoryInfo.length - 1
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
                    ? patient.patientMedicalHistories
                        ?.patientMedicalHistoryInfo[
                        patient.patientMedicalHistories
                          ?.patientMedicalHistoryInfo.length - 1
                      ]?.bloodPressure
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
              <div className="flex p-1 bg-white gap-2 items-center border-2 border-slate-300">
                <button
                  onClick={() => {
                    setShow(true);
                    setVariant("editMedicalRecord");
                  }}
                  className="m-auto  hover:bg-gray-200 text-gray-800 font-bold px-4 rounded inline-flex gap-2 items-center border-2 border-dark-green"
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
              {patient.patientMedicalHistories.patientMedicalHistoryInfo.map(
                (row) => (
                  <tr>
                    <td className="whitespace-nowrap text-sm">{row?.date}</td>
                    <td className="p-2 text-sm">{row?.notes}</td>
                    <td className="text-sm">{row?.symptoms}</td>
                    <td className="text-sm">{row?.treatments}</td>
                    <td className="text-sm">{row?.medication}</td>
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
        <div className="flex p-1 items-center justify-center bg-white gap-4 border-2 border-b-slate-500">
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
