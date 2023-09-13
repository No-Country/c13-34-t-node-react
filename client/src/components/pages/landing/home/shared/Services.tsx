import { useState } from "react";
import { NavLink } from "react-router-dom";
const serviceImages = [
  { title: "Exámenes médicos", path: "/images/service1.webp" },
  { title: "Enfoque", path: "/images/service2.jpg" },
  { title: "Consultas", path: "/images/service3.jpg" },
  { title: "Especialidades", path: "/images/service4.jpg" },
];

export const Services = () => {
  const [imageSelected, setImageSelected] = useState(serviceImages[1]);
  return (
    <div className="flex flex-col gap-2 2xl:gap-4 items-center justify-center">
      <p className="text-2xl 2xl:text-3xl text-center font-caudex font-bold tracking-wide text-dark-green pb-5">
        "La atención médica más completa."
      </p>
      <div className="2xl:justify-evenly w-full 2xl:flex 2xl:gap-32">
        <div className="flex flex-col gap-4 w-full md:w-1/2 pt-6 px-14 xl:pr-6 2xl:h-96 bg-lightest-green">
          <div className="">
              <p className="font-caudex text-center 2xl:text-left font-bold text-xl 2xl:text-2xl tracking-wide mt-8 2xl:pb-4">
                {imageSelected.title}
              </p>
              <p className="2xl:text-lg pb-12">
                En Meddyplus, entendemos que la salud es un concepto integral. Por
                eso, no solo nos enfocamos en la curación de enfermedades, sino
                también en la prevención y el bienestar general. Nuestros programas
                de salud preventiva y cuidado continuo están diseñados para ayudarlo
                a mantenerse saludable a lo largo de su vida.
              </p>
            <div className="bg-white w-full sm:w-3/4 xl:w-fit flex justify-center gap-8 md:-bottom-20 m-auto left-0 right-0 rounded-xl p-5 border-2 border-slate-300">
              {serviceImages.map((image) => (
                <div
                  key={image.path}
                  onClick={() => setImageSelected(image)}
                  className={`w-24 rounded-lg cursor-pointer hover:drop-shadow-2xl ${
                    imageSelected.title === image.title
                      ? "border-4 border-slate-300"
                      : ""
                  }`}
                >
                  <img src={image.path} className="h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="2xl:flex 2xl:relative 2xl:justify-center 2xl:w-72 2xl:ml-36">
          <div className="grid justify-center">
            <img
              src={imageSelected.path}
              className="w-48 2xl:w-72 rounded-md mb-8 justify-self-center pt-4 2xl:pt-0"
            />
            <NavLink to="/sobre-nosotros">
              <button className="w-56 2xl:w-full 2xl:absolute py-3 rounded-2xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border-[2px] transition duration-300 font-medium">
                Sobre nosotros
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
