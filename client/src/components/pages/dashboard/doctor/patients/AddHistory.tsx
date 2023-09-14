import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface PropsTypes {
  handleMedicalRecordSubmit: (
    e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;
  showError: boolean;
  isLoading: boolean;
}

export const AddHistory = ({
  handleMedicalRecordSubmit,
  showError,
  isLoading,
}: PropsTypes) => {
  return (
    <div className="text-center flex flex-col justify-start px-12 gap-4">
      <p className=" border-b-2 border-slate-200 p-0">
        Agregar historial médico
      </p>
      <form
        onSubmit={handleMedicalRecordSubmit}
        className="flex flex-col gap-2 justify-center text-center"
      >
        <label className="">
          <p className="text-sm w-">Notas *</p>
          <textarea
            id="notes"
            name="notes"
            minLength={8}
            maxLength={255}
            rows={3}
            required
            className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
          />
        </label>
        <label className="">
          <p className="text-sm w-">Síntomas *</p>
          <textarea
            id="symptoms"
            name="symptoms"
            rows={3}
            minLength={8}
            maxLength={255}
            required
            className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
          />
        </label>
        <label className="">
          <p className="text-sm w-">Tratamientos *</p>
          <textarea
            id="treatments"
            name="treatments"
            minLength={8}
            maxLength={255}
            rows={3}
            required
            className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
          />
        </label>
        <label className="">
          <p className="text-sm w-">Medicación *</p>
          <textarea
            id="medication"
            name="medication"
            minLength={8}
            maxLength={255}
            rows={3}
            required
            className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
          />
        </label>
        <label className="">
          <p className="text-sm w-">Altura (cm) *</p>
          <input
            id="height"
            name="height"
            type="number"
            min={10}
            max={999}
            required
            className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
          />
        </label>
        <label className="">
          <p className="text-sm w-">Peso (kg) *</p>
          <input
            id="weight"
            name="weight"
            min={10}
            max={999}
            type="number"
            required
            className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
          />
        </label>
        <label>
          <p className="text-sm w-">Presión arterial *</p>
          <div className="flex h-8 gap-2">
            <input
              id="bloodPressureSis"
              name="bloodPressureSis"
              min={10}
              max={999}
              type="number"
              required
              className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
            />
            /
            <input
              id="bloodPressureDias"
              name="bloodPressureDias"
              min={10}
              max={999}
              type="number"
              required
              className={`ring-1 ring-gray-300 text-xs w-full p-2 rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary-gray`}
            />
          </div>
        </label>
        {showError && <p className="text-red-500">Ha ocurrido un error!</p>}
        <button
          type="submit"
          className="disabled:bg-slate-300 w-max hover:opacity-90 self-center w-1/2 bg-dark-green text-white rounded-xl py-1 px-2"
        >
          {isLoading ? <LoadingSpinner /> : "Enviar"}
        </button>
      </form>
    </div>
  );
};
