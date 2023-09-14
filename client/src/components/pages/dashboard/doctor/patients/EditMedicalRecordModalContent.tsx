import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { TPatientInfo } from "@/types/patients";

interface PropsTypes {
  handleMedicalRecordSubmit: (
    e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;
  patient: TPatientInfo;
  showError: boolean;
  isLoading: boolean;
}

export const EditMedicalRecordModalContent = ({
  handleMedicalRecordSubmit,
  patient,
  showError,
  isLoading,
}: PropsTypes) => {
  return (
    <div className="text-center flex flex-col justify-start px-12 gap-4">
      <p className="border-b-2 border-slate-200 p-0">Editar registro médico</p>
      <form
        onSubmit={handleMedicalRecordSubmit}
        className="flex flex-col gap-4 justify-center text-center"
      >
        <label className="">
          <p className="text-sm">Patologías preexistentes *</p>
          <textarea
            id="previousMedicalConditions"
            name="previousMedicalConditions"
            minLength={10}
            defaultValue={patient.medicalRecordInfo?.previousMedicalConditions}
            rows={4}
            required
            className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
          />
        </label>
        <label className="">
          <p className="text-sm">Alergias *</p>
          <textarea
            id="allergies"
            name="allergies"
            minLength={10}
            rows={4}
            defaultValue={patient.medicalRecordInfo?.allergies}
            required
            className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
          />
        </label>
        <label className="">
          <p className="text-sm w-">Antecedentes familiares *</p>
          <textarea
            id="familyMedicalHistory"
            name="familyMedicalHistory"
            minLength={10}
            rows={4}
            defaultValue={patient.medicalRecordInfo?.familyMedicalHistory}
            required
            className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
          />
        </label>
        {showError && <p className="text-red-500">Ha ocurrido un error!</p>}
        <button
          type="submit"
          className="disabled:bg-slate-300 w-max hover:opacity-90 self-center bg-dark-green text-white rounded-xl py-1 px-2"
        >
          {isLoading ? <LoadingSpinner /> : "Enviar"}
        </button>
      </form>
    </div>
  );
};
