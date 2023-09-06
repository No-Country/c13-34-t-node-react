import { NavLink } from "react-router-dom";

export const Welcome = () => {
  return (
    <div className="grid 2xl:grid-cols-2 2xl:gap-24 max-sm:pt-4 2xl:h-[620px] w-full">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col w-full">
          <h1 className="font-caudex text-3xl 2xl:text-5xl font-bold pt-4 2xl:pt-14 mb-3 2xl:tracking-[1px]">
            "Donde una revisión clara se une a una atención compasiva."
          </h1>
          <p className="2xl:w-[600px] font-opensans leading-1 pb-4 2xl:pb-20 text-justify">
            La excelencia en la atención a cada paciente, compromiso de todos
            los profesionales de la Clínica, un centro médico especializado que
            brinda servicios de diagnóstico, terapéuticos y quirúrgicos.
          </p>
        </div>
        <div className="p-7 2xl:w-full rounded-lg shadow-lg bg-white/70">
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6 2xl:gap-12">
            <div className="2xl:col-span-2">
              <h3 className="text-dark-green font-bold text-2xl mb-6 2xl:mb-12">
                Reservar una cita
              </h3>
              <div className="2xl:flex items-center gap-2 text-xl 2xl:text-base">
                <div className="flex flex-row items-center gap-3">
                  <img src="/images/location.png" alt="location" />
                  <p>Cruce de Shivranjani</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <img src="/images/calendar.png" alt="calendar" />
                  <p>10 abril, 2023 lunes</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <img src="/images/clock.png" alt="clock" />
                  <p>11:00 AM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div>
                <p className="text-center pb-2">Tienes una cuenta</p>
                <NavLink to="/acceso">
                  <button className="w-full py-3 rounded-2xl text-xl hover:text-white text-primary-green bg-white hover:bg-primary-green border-primary-green border-[2px] transition duration-300 font-medium">
                    Iniciar sesión
                  </button>
                </NavLink>
              </div>

              <div>  
                <p className="text-center pb-2">No tienes una cuenta ?</p>
                <NavLink to="/registro">
                  <button className="w-full py-3 rounded-2xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border-[2px] transition duration-300 font-medium">
                    Crear cuenta
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden 2xl:flex">
        <img
          src="/images/doctor-home.png"
          alt="doctor1"
          className="h-96 w-[400px] 2xl:w-[800px] 2xl:h-[600px]"
        />
      </div>
    </div>
  );
};