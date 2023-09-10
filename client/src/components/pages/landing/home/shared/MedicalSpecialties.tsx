import { NavLink } from 'react-router-dom';
import imageDiversitySpecialties from "/images/home-doctor-4.png";

export const MedicalSpecialties = () => {
  return (
    <>
      <h2 className="text-center font-caudex text-2xl 2xl:text-3xl mb-[-15px] 2xl:mb-4 text-dark-green font-bold px-2">
        Diversidad de especialidades médicas
      </h2>

      <div className="2xl:flex mt-5 mb-">
        <div className="w-[90%] mx-auto 2xl:py-0 2xl:w-1/2 mt-2 2xl:text-lg 2xl:grid 2xl:p-32">
          <div className="2xl:justify-center">
            <p>
              En nuestra clínica de medicina integral, te presentamos a un equipo
              diverso de especialistas altamente capacitados en una amplia gama de
              áreas médicas. Reconocemos que cada paciente tiene necesidades
              únicas y es por eso que contamos con un equipo de expertos
              comprometidos en ofrecer un enfoque completo para tu salud y
              bienestar.
              <br />
              En nuestra clínica, nos enorgullece proporcionarte una atención de
              calidad en un ambiente acogedor y compasivo.
              <br />
              Esperamos recibirte pronto y comenzar juntos un camino hacia una
              vida más saludable y activa. Juntos, podemos marcar la diferencia en
              tu salud y calidad de vida.
              <br />
              Te invitamos a formar parte de nuestra comunidad de cuidado de la salud y confiamos en que te sentirás respaldado en cada paso del camino. ¡Estamos aquí para ti!
            </p>

            <NavLink to={"/sobre-nosotros"}>
              <div className="grid">
                <button className="w-[287.2px] h-[55.2px] justify-self-center mt-4 2xl:justify-self-auto 2xl:w-[360px] 2xl:mt-8 2xl:py-3 rounded-2xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300">
                  Conócenos mejor
                </button>
              </div>
            </NavLink>
          </div>
        </div>

        <div className="mt-4 grid 2xl:w-1/2">
          <img
            className="justify-self-center w-80 2xl:w-[500px] border border-x-gray-200 mb-2"
            src={imageDiversitySpecialties}
            alt="imagen-vista-2"
          />

          <p className="justify-self-center 2xl:text-lg font-bold">
            Dra. María Eugenia Becerra
          </p>
          <p className="justify-self-center pb-6 2xl:text-lg rounded-b-lg">MP: 39658</p>
        </div>
      </div>
    </>
  );
};