import imagePatient1s5 from "/images/paciente-1-section5.png";
import imagePatient2s5 from "/images/paciente-2-section5.png";
import imagePatient3s5 from "/images/paciente-3-section5.png";
import { FaStar } from 'react-icons/fa';

  
  export const PatientTestimonials = () => {
    return (
      <>
        <h2 className="text-center text-2xl text-other-blue font-bold ">Opiniones de nuestros pacientes</ h2>

        <p className="text-center mt-3 text-lg">¡Qué experiencia tan maravillosa con Meddyplus! Su médico hará el mejor esfuerzo posible para diagnosticar la condición que lo afecta.</p>

        <div className="mt-8 flex justify-between">
            <div className="w-80 border-2 border-primary-green rounded-xl relative mb-8">
                <div className="grid mt-4 mb-4">
                    <div className="justify-self-center flex" >
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                    </div>
                </div>
                <div className="px-4">
                    <p className="mt-2">En Meddyplus, encuentro confianza y tranquilidad. Su compromiso con la atención de calidad brilla en cada consulta. Es un honor ser atendido por profesionales tan destacados. La excelencia es su sello distintivo. ¡Una clínica digna de cinco estrellas!</p>
                </div>

                <div className="flex justify-center">
                    <img
                        className="absolute bottom-[-40px] mx w-20 h-20 rounded-full"
                        src={imagePatient1s5}
                        alt="Foto Paciente 1"
                    />
                </div>
            </div>

            <div className="w-80 border-2 h-72 border-primary-green rounded-xl relative mb-8">
            <div className="grid mt-4">
                    <div className="justify-self-center flex" >
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                    </div>
                </div>

                <div className="px-4">
                    <p className="mt-2 pb-28">Elegir Meddyplus fue una excelente decisión. Su compromiso con la atención de calidad es evidente desde el primer momento. Los logros y credenciales de sus profesionales hablan por sí mismos. La experiencia es siempre excepcional. ¡Recomendados ampliamente!</p>
                </div>

                <div className="flex justify-center">
                    <img
                        className="absolute bottom-[-40px] mx w-20 h-20 rounded-full"
                        src={imagePatient2s5}
                        alt="Foto Paciente 1"
                    />
                </div>
            </div>

            <div className="w-80 border-2 border-primary-green rounded-xl relative mb-8">
            <div className="grid mt-4 ">
                    <div className="justify-self-center flex" >
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                        <FaStar className="w-6 h-6 text-yellow-500" />
                    </div>
                </div>

                <div className="px-4">
                    <p className="mt-2">No puedo elogiar lo suficiente a Meddyplus. Su dedicación al compromiso con la atención de calidad se nota en cada detalle. Cada profesional con el que he interactuado muestra una pasión genuina por el bienestar de los pacientes. </p>
                </div>

                <div className="flex justify-center">
                    <img
                        className="absolute bottom-[-40px] mx w-20 h-20 rounded-full"
                        src={imagePatient3s5}
                        alt="Foto Paciente 1"
                    />
                </div>
            </div>
        </div>
      </>
    );
  };