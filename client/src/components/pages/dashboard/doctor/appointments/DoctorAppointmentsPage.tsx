export const DoctorAppointmentsPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="bg-dark-green h-52">
        <h2 className="text-white text-lg font-bold uppercase px-8 pt-10 pb-10">
          Agendar Nueva Cita
        </h2>

        <div className="bg-white mx-8 p-8 rounded-2xl shadow-xl">
          <div className="text-2xl text-dark-green font-medium pb-10">
            Agendar nueva cita
          </div>
          <form
            // onSubmit={}
            className="w-full flex flex-col gap-6"
          >
            <label className="block">
              <span className="block text-lg text-gray-400 font-semibold pb-1">
                Descripción *
              </span>
              <input
                // value={}
                // onChange={}
                type="text"
                required
                placeholder="Describe brevemente la consulta"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

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
                Día de la cita *
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
                Hora de atención *
              </span>
              <input
                // value={}
                // onChange={}
                type="string"
                required
                placeholder="Ingrese la hora"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block pb-10">
              <span className="block text-lg text-gray-400 font-semibold pb-1">
                Tipo de consulta *
              </span>
              <select
                // value={specialty}
                // onChange={}
                required
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              >
                <option value="">Seleccione tipo</option>
                <option value="consultation">Consulta</option>
                <option value="exam">Examen</option>
                <option value="operation">Operation</option>
              </select>
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
