export const SectionAbout2 = () => {
  return (
    <div className="flex px-6 flex-col md:flex-row justify-center items-center relative w-full h-[500px] md:h-[700px] gap-4 first-letter:xl:gap-24 mb-2">
      <div className="absolute w-screen left-0">
        <img
          src="/images/waves.png"
          alt="background waves design"
          className="w-screen h-[500px] md:h-[800px]"
        />
      </div>
      <div className="md:w-[600px] md:mt-0 mt-24 flex flex-col gap-2 2xl:gap-12">
        <p className="font-caudex text-center md:text-left text-2xl 2xl:text-3xl font-bold tracking-wide text-dark-green">
          TECNOLOGIA DE VANGUARDIA
        </p>
        <p className="2xl:text-lg">
          En nuestra clínica, nos enorgullece ofrecer el servicio más completo en tecnología aplicada a la salud. Estamos comprometidos con brindarte la atención médica más avanzada y eficiente, respaldada por las últimas innovaciones en el campo de la medicina.
          <br />
          Nuestra inversión en tecnología de última generación nos permite llevar a cabo diagnósticos más precisos y tratamientos más efectivos.
        </p>

        <p className="hidden 2xl:block 2xl:text-lg">
        Desde la digitalización de registros médicos hasta la realización de procedimientos quirúrgicos asistidos por tecnología de punta, en nuestra clínica, estamos a la vanguardia en la aplicación de avances tecnológicos para tu beneficio. Nos esforzamos para ofrecerte soluciones de salud de primer nivel.

        </p>
      </div>
      <div className="relative z-10 2xl:self-end rounded-lg w-1/2 xl:w-auto">
        <img src="/images/about-section2.jpg" className="rounded-lg" />
      </div>
    </div>
  );
};
