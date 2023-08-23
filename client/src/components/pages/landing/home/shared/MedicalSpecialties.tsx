import imageDiversitySpecialties from "/images/home-doctor-4.png";

export const MedicalSpecialties = () => {
    return (
      <>
        <h2 className="text-center text-2xl text-other-blue font-bold ">Diversidad de especialidades médicas</h2>

        <div className="md:w-[100%] mx-auto md:flex md:justify-between md:mt-5 mb-4">
            <div className="w-[90%] mx-auto mt-2 md:w-[40%] md:mt-0">
                <p>
                    En nuestra clínica de medicina integral, te presentamos a un equipo diverso de especialistas altamente capacitados en una amplia gama de áreas médicas. Reconocemos que cada paciente tiene necesidades únicas y es por eso que contamos con un equipo de expertos comprometidos en ofrecer un enfoque completo para tu salud y bienestar.<br /><br />
                    Desde médicos internistas hasta especialistas en neurología, ginecología y ortopedia, nuestro equipo de profesionales está dedicado a brindarte una atención médica excepcional. Cada uno de nuestros especialistas trae consigo una profunda experiencia y un profundo compromiso de proporcionarte diagnósticos precisos y tratamientos efectivos.<br />
                    Creemos en una atención médica personalizada y colaborativa. Nuestros especialistas se toman el tiempo para escuchar tus preocupaciones y metas de salud, trabajando contigo para desarrollar planes de tratamiento adaptados a tus necesidades individuales.<br /><br />
                    Ya sea que estés buscando un enfoque preventivo, manejo de condiciones crónicas o atención especializada, nuestro equipo está aquí para respaldarte en tu viaje hacia una mejor salud. Valoramos tu bienestar y nos esforzamos por brindarte una experiencia médica centrada en el paciente en cada visita.<br />
                    En nuestra clínica, nos enorgullece proporcionarte una atención de calidad en un ambiente acogedor y compasivo. Confía en nuestros especialistas para cuidar de tu salud y descubre cómo puedes alcanzar tus objetivos de bienestar de manera eficaz y segura.<br /><br />
                    Esperamos recibirte pronto en nuestra clínica y comenzar juntos un camino hacia una vida más saludable y activa. Juntos, podemos marcar la diferencia en tu salud y calidad de vida.
                </p>

                <button className="w-[360px] mt-5 py-3 rounded-3xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300">
                    Enviar
                </button>
            </div>
            
            <div className="w-[80%] mx-auto mt-4 md:w-[45%] md:mt-0">
                <img className="w-[100%] border border-x-gray-200" src={imageDiversitySpecialties} alt="imagen-vista-2" />

                <p className="mt-2">Dra. María Eugenia Becerra</p>
                <p>MP: 39658</p>
            </div>
        </div>
      </>
    );
  };
