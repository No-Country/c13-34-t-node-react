import { useState } from "react";
const serviceImages = [
  { title: "Exámenes médicos", path: "/images/service1.webp" },
  { title: "Turnos", path: "/images/service2.jpg" },
  { title: "Consultas", path: "/images/service3.jpg" },
  { title: "Especialidades", path: "/images/service4.jpg" },
];

export const Services = () => {
  const [imageSelected, setImageSelected] = useState(serviceImages[1]);
  return (
    <div className="flex flex-col gap-12 items-center justify-center">
      <p className="text-3xl text-center font-caudex font-bold tracking-wide text-dark-green">
        "La atención médica más completa."
      </p>
      <div className="relative w-full flex xl:gap-32">
        <div className="relative flex flex-col gap-8 w-full md:w-1/2 pt-6 px-2 xl:pl-36 xl:pr-6 bg-lightest-green">
          <p className="font-caudex text-3xl tracking-wide">
            {imageSelected.title}
          </p>
          <p className="font-caudex text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sed
            culpa possimus consequatur? Assumenda neque reprehenderit odit odio,
            vero tenetur error? Esse adipisci inventore optio ex iusto, quia
            asperiores officia.
          </p>
          <div className="bg-white w-full sm:w-3/4 xl:w-fit flex justify-center gap-8 md:-bottom-20 md:absolute m-auto left-0 right-0 rounded-xl p-5 border-2 border-slate-300">
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
        <div className="hidden md:flex relative justify-center w-80 ml-20">
          <img
            src={imageSelected.path}
            className="h-80 rounded-md drop-shadow-lg"
          />
          <button className="w-full absolute -bottom-20 py-3 rounded-2xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border-[2px] transition duration-300 font-medium">
            Conocer más
          </button>
        </div>
      </div>
    </div>
  );
};
