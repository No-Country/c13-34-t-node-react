export const SectionAbout4 = () => {
  return (
    <div className="flex flex-col 2xl:grid 2xl:grid-cols-2">
      <div className="flex flex-col">
        <h1 className="text-2xl 2xl:text-3xl font-caudex font-bold text-dark-blue pb-2 2xl:pb-5">
          ¿Por qué los pacientes eligen nuestra clínica?
        </h1>
        <p className="text-base 2xl:text-lg font-opensans 2xl:w-[700px] pb-8 tracking-[1px]">
          En nuestra clínica, hemos establecido un legado de excelencia en el
          campo de la medicina en general. Nuestro compromiso con la atención de
          calidad y la innovación constante nos ha llevado a recibir
          reconocimientos a nivel nacional e internacional en el pasado. Sin
          embargo, nuestro logro más significativo es el impacto positivo que
          hemos tenido en la vida de miles de pacientes que ahora disfrutan de
          una mejor calidad de vida gracias a nuestros tratamientos exitosos.
          Creemos firmemente en un enfoque de equipo para brindar resultados
          incomparables, una y otra vez. Desde la atención preventiva hasta
          procedimientos médicos de vanguardia, nuestro compromiso con la
          excelencia y la satisfacción del paciente es inquebrantable. Cuando
          elige nuestra clínica, elige un equipo dedicado a su bienestar
          integral y a mejorar su calidad de vida. Nuestra pasión por la
          medicina y nuestro compromiso con la atención de calidad son las
          razones por las cuales los pacientes nos eligen una y otra vez.
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-center h-16 2xl:h-[120px] pb-10 2xl:pb-12 relative">
          <div className="absolute">
            <img
              src="/images/about-expertise.png"
              alt="about-logo"
              className=""
            />
          </div>
          <h1 className="text-3xl font-caudex font-bold text-dark-green relative">
            Especialización
          </h1>
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 max-sm:px-16">
            <img
              src="/images/about4a.png"
              alt="icon"
              className="w-[180px] h-[180px]"
            />
            <h2 className="text-base 2xl:text-2xl text-center w-36">
              Cardiología
            </h2>
          </div>
          <div className="flex flex-col items-center gap-2 max-sm:px-16">
            <img
              src="/images/about4b.png"
              alt="icon"
              className="w-[180px] h-[180px]"
            />
            <h2 className="text-base 2xl:text-2xl text-center">
              Gastroenterología
            </h2>
          </div>
          <div className="flex flex-col items-center gap-2 max-sm:px-16">
            <img
              src="/images/about4c.png"
              alt="icon"
              className="w-[180px] h-[180px]"
            />
            <h2 className="text-base 2xl:text-2xl text-center w-32">
              Endocrinología
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
