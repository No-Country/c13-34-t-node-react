export const Welcome = () => {
  return (
    <div className="grid 2xl:grid-cols-2 gap-24 2xl:h-[620px]">
      <div className="flex flex-col gap-2 sm:w-full 2xl:w-[800px]">
        <h1 className="font-caudex sm:text-4xl 2xl:text-5xl font-bold sm:pt-4 2xl:pt-14 mb-3 tracking-[1px]">
          "Donde una revisión clara se une a una atención compasiva."
        </h1>
        <p className="w-[600px] font-opensans leading-1 pb-20">
          La excelencia en la atención a cada paciente, compromiso de todos los
          profesionales de la Clínica, un centro médico especializado que brinda
          servicios de diagnóstico, terapéuticos y quirúrgicos.
        </p>
        <div className="p-7 w-full rounded-lg shadow-lg bg-white/70">
          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-2">
              <h3 className="text-dark-green font-bold text-2xl mb-12">
                Reservar una cita
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex flex-row gap-3">
                  <img src="/images/location.png" alt="location" />
                  <p>Cruce de Shivranjani</p>
                </div>
                <div className="flex flex-row gap-3">
                  <img src="/images/calendar.png" alt="calendar" />
                  <p>10 abril, 2023 lunes</p>
                </div>
                <div className="flex flex-row gap-3">
                  <img src="/images/clock.png" alt="clock" />
                  <p>11:00 AM</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-8">
              <button className="w-full py-3 rounded-2xl text-xl hover:text-white text-primary-green bg-white hover:bg-primary-green border-primary-green border-[2px] transition duration-300">
                botón reprogramar
              </button>
              <button className="w-full py-3 rounded-2xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border-[2px] transition duration-300 font-medium">
                botón de libro
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          src="/images/doctor-home.png"
          alt="doctor1"
          className="w-[800px] h-[600px]"
        />
      </div>
    </div>
  );
};
