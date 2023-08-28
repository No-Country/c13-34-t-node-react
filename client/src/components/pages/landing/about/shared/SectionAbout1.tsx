import { FC } from "react";

export const SectionAbout1 = () => {
  return (
    <div className="flex flex-col 2xl:grid 2xl:grid-cols-2 w-full gap-4">
      <div className="flex flex-col w-full 2xl:order-1">
        <h1 className="text-2xl 2xl:text-3xl font-bold font-caudex max-sm:pt-4 pb-1 2xl:tracking-[1px]">
          ENFOQUE EN EL CUIDADO DE LOS OJOS Y CIRUGÍA
        </h1>
        <h2 className="text-2xl 2xl:text-3xl font-bold font-caudex text-primary-green pb-5 2xl:tracking-[1px]">
          Su Visión, Nuestra Misión
        </h2>

        <p className="font-opensans 2xl:w-[550px] 2xl:tracking-[1px] pb-1 2xl:pb-20 text-justify">
          Un centro médico especializado que brinda servicios de diagnóstico,
          terapéuticos y quirúrgicos relacionados con los ojos y la visión. Un
          centro médico especializado que brinda servicios de diagnóstico,
          terapéuticos y quirúrgicos relacionados con los ojos y la visión.
        </p>
        <div className="hidden 2xl:flex">
          <Button />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="pb-4">
          <img
            src="/images/about1.png"
            alt="about1"
            className="object-cover 2xl:w-[750px] rounded-md"
          />
        </div>
        <div className="2xl:hidden">
          <Button />
        </div>
      </div>
    </div>
  );
};

const Button: FC = () => {
  return (
    <button className="w-full 2xl:w-[325px] py-3 rounded-2xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border-[2px] transition duration-300 font-medium">
      botón de libro
    </button>
  );
};
