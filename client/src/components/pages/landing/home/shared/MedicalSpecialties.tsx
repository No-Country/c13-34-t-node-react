/* import imageDiversitySpecialties from "/images/home-doctor-4.png";

export const MedicalSpecialties = () => {
  return (
    <>
      <h2 className="text-center font-caudex text-3xl mb-12 text-dark-green font-bold ">
        Diversidad de especialidades médicas
      </h2>

      <div className="w-[100%] px-20 flex gap-72 justify-between mt-5 mb-4">
        <div className="w-[90%] mx-auto mt-2 text-xl">
          <p>
            En nuestra clínica de medicina integral, te presentamos a un equipo
            diverso de especialistas altamente capacitados en una amplia gama de
            áreas médicas. Reconocemos que cada paciente tiene necesidades
            únicas y es por eso que contamos con un equipo de expertos
            comprometidos en ofrecer un enfoque completo para tu salud y
            bienestar.
            <br />
            <br />
            En nuestra clínica, nos enorgullece proporcionarte una atención de
            calidad en un ambiente acogedor y compasivo.
            <br />
            <br />
            Esperamos recibirte pronto y comenzar juntos un camino hacia una
            vida más saludable y activa. Juntos, podemos marcar la diferencia en
            tu salud y calidad de vida.
          </p>

          <button className="w-[360px] mt-8 py-3 rounded-3xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300">
            Agendar
          </button>
        </div>

        <div className="w-[60%] mx-auto mt-4">
          <img
            className="w-[100%] border border-x-gray-200"
            src={imageDiversitySpecialties}
            alt="imagen-vista-2"
          />

          <p className="text-2xl font-bold bg-primary-gray">
            Dra. María Eugenia Becerra
          </p>
          <p className="pb-6 text-xl bg-primary-gray rounded-b-lg">MP: 39658</p>
        </div>
      </div>
    </>
  );
}; */

import imageDiversitySpecialties from "/images/home-doctor-4.png";

export const MedicalSpecialties = () => {
  return (
    <>
      <h2 className="text-center font-caudex text-3xl mb-4 text-dark-green font-bold px-2">
        Diversidad de especialidades médicas
      </h2>

      <div className="2xl:flex mt-5 mb-4">
        <div className="w-[90%] mx-auto 2xl:py-0 2xl:w-1/2 mt-2 text-xl 2xl:grid 2xl:p-32">
          <div className="2xl:justify-center">
            <p>
              En nuestra clínica de medicina integral, te presentamos a un equipo
              diverso de especialistas altamente capacitados en una amplia gama de
              áreas médicas. Reconocemos que cada paciente tiene necesidades
              únicas y es por eso que contamos con un equipo de expertos
              comprometidos en ofrecer un enfoque completo para tu salud y
              bienestar.
              <br />
              <br />
              En nuestra clínica, nos enorgullece proporcionarte una atención de
              calidad en un ambiente acogedor y compasivo.
              <br />
              <br />
              Esperamos recibirte pronto y comenzar juntos un camino hacia una
              vida más saludable y activa. Juntos, podemos marcar la diferencia en
              tu salud y calidad de vida.
            </p>

            <div className="grid">
              <button className="w-[287.2px] h-[55.2px] justify-self-center mt-4 2xl:justify-self-auto 2xl:w-[360px] 2xl:mt-8 2xl:py-3 rounded-2xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300">
                Agendar
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 grid 2xl:w-1/2">
          <img
            className="justify-self-center w-[90%] 2xl:w-[500px] border border-x-gray-200 mb-2"
            src={imageDiversitySpecialties}
            alt="imagen-vista-2"
          />

          <p className="justify-self-center 2xl:text-2xl font-bold">
            Dra. María Eugenia Becerra
          </p>
          <p className="justify-self-center pb-6 2xl:text-xl rounded-b-lg">MP: 39658</p>
        </div>
      </div>
    </>
  );
};
