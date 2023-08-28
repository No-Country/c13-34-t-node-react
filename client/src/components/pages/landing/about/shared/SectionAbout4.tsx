export const SectionAbout4 = () => {
  return (
    <div className="flex flex-col 2xl:grid 2xl:grid-cols-2">
      <div className="flex flex-col">
        <h1 className="text-3xl 2xl:text-4xl font-caudex font-bold text-dark-green pb-2 2xl:pb-5">
          ¿Por qué las pacientes eligen nuestra clínica?
        </h1>
        <p className="text-lg font-opensans text-justify 2xl:w-[700px] pb-8 tracking-[1px]">
          We have constantly raised the benchmarks in eye care and this has led
          to many awards and accolades at national and international level in
          the past. But our most important achievement is the thousands of
          satisfied patients who now enjoy a better quality of life because of
          successful treatments. We strongly believe in a team approach to
          provide unparalleled results, time after time. satisfied patients who
          now enjoy a better quality of life because of successful treatments.
          We strongly believe in a team approach to provide unparalleled
          results, time after time.
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
              Oftalmología pediátrica
            </h2>
          </div>
          <div className="flex flex-col items-center gap-2 max-sm:px-16">
            <img
              src="/images/about4b.png"
              alt="icon"
              className="w-[180px] h-[180px]"
            />
            <h2 className="text-base 2xl:text-2xl text-center">
              Córnea y enfermedades externas
            </h2>
          </div>
          <div className="flex flex-col items-center gap-2 max-sm:px-16">
            <img
              src="/images/about4c.png"
              alt="icon"
              className="w-[180px] h-[180px]"
            />
            <h2 className="text-base 2xl:text-2xl text-center w-32">
              Neuro oftalmología
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
