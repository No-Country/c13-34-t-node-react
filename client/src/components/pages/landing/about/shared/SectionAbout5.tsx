export const SectionAbout5 = () => {
  return (
    <>
      <div className="h-96 lg:h-60 flex justify-center items-center mt-5">
        <div className="absolute w-screen left-0 flex lg:mt-10">
          <img
            src="/images/waves.png"
            alt="background waves design"
            className="w-screen h-[500px]"
          />
        </div>

        <div className="inline-flex flex-col lg:flex-row lg:gap-48 gap-10">
          <div className="relative bg-white w-64 h-20 rounded-2xl flex justify-center">
            <p className="absolute -top-5 font-caudex text-4xl font-bold text-dark-green tracking-wider">
              300+
            </p>
            <p className="text-center font-opensans text-lg self-center">
              Total de pacientes
            </p>
          </div>
          <div className="relative bg-white w-64 h-20 rounded-2xl flex justify-center">
            <p className="absolute -top-5 font-caudex text-4xl font-bold text-dark-green tracking-wider">
              450+
            </p>
            <p className="text-center font-opensans text-lg self-center">
              Total de cirugías
            </p>
          </div>
          <div className="relative bg-white w-64 h-20 rounded-2xl flex justify-center">
            <p className="absolute -top-5 font-caudex text-4xl font-bold text-dark-green tracking-wider">
              210+
            </p>
            <p className="text-center font-opensans text-lg self-center">
              Total de operaciones
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
