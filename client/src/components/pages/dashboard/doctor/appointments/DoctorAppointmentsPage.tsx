export const DoctorAppointmentsPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="bg-dark-green h-52">
        <h2 className="text-white text-lg font-bold uppercase px-8 pt-10 pb-10">
          Agendar Citas
        </h2>

        <div className="bg-white mx-8 p-8 rounded-2xl shadow-xl">
          <div className="text-2xl text-dark-green font-medium pb-10">
            Agendar disponibilidad
          </div>
          <form
            // onSubmit={}
            className="w-full flex flex-col gap-6"
          >
            <label className="block">
              <span className="block text-lg text-gray-400 font-semibold pb-1">
                Especialidad *
              </span>
              <select
                // value={specialty}
                // onChange={}
                required
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              >
                <option value="">Seleccionar especialidad</option>
                <option value="glaucoma">Glaucoma</option>
                <option value="infection">Infection</option>
              </select>
            </label>

            <label className="block">
              <span className="block text-lg text-gray-400 font-semibold pb-1">
                Fecha(s) de atención *
              </span>
              <input
                // value={}
                // onChange={}
                type="date"
                required
                placeholder="Ingrese la fecha"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block text-lg text-gray-400 font-semibold pb-1">
                Horario de atención *
              </span>
              <input
                // value={}
                // onChange={}
                type="string"
                required
                placeholder="Ingrese las horas de atención"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <button className="2xl:w-48 bg-dark-green py-2 tracking-wider px-6 rounded-xl text-white hover:text-dark-green hover:bg-white border hover:border-dark-green uppercase transition font-medium">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
