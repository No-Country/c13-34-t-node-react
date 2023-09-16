import { FC } from "react";
import { NavLink } from "react-router-dom";

export const SectionAbout1 = () => {
  return (
    <div className="flex flex-col px-6 2xl:grid 2xl:grid-cols-2 w-full gap-4 mb-[-20px]">
      <div className="flex flex-col w-full 2xl:order-1">
        <h1 className="text-2xl 2xl:text-3xl font-bold font-caudex max-sm:pt-4 pb-1 2xl:tracking-[1px] text-center 2xl:text-left">
          ENFOCADOS EN TU BIENESTAR
        </h1>
        <h2 className="text-2xl 2xl:text-3xl font-bold font-caudex text-primary-green pb-5 2xl:tracking-[1px] text-center 2xl:text-left">
          Nuestra misión, tu salud
        </h2>

        <p className="font-opensans 2xl:w-[550px] tracking-[1px] pb-1 2xl:pb-20 2xl:text-lg">
          Bienvenido a nuestra clínica médica especializada, un centro de
          atención integral que ofrece una amplia gama de servicios médicos,
          diagnósticos, terapéuticos y quirúrgicos para abordar sus necesidades
          de salud de manera completa. Nuestra dedicación a la medicina general
          y la atención de calidad nos impulsa a brindar el mejor cuidado
          posible para su bienestar.  Ofrecemos servicios médicos de atención primaria y preventiva para mantenerlo saludable y atender sus necesidades de atención médica preventiva.
        </p>
        <div className="hidden 2xl:w-[325px] 2xl:flex 2xl:flex-col">
          <div className="grid 2xl:mt-[-54px]">
            <p className="2xl:justify-self-center 2xl:text-lg pb-1">
              No tienes una cuenta ?
            </p>
            <NavLink to="/registro">
              <Button />
            </NavLink>
          </div>
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
          <div className="grid">
            <p className="justify-self-center pb-1">No tienes una cuenta ?</p>
            <NavLink to="/registro">
              <Button />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

const Button: FC = () => {
  return (
    <NavLink to="/registro">
      <button className="w-full 2xl:w-[325px] py-3 rounded-2xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border-[2px] transition duration-300 font-medium">
        Crear cuenta
      </button>
    </NavLink>
  );
};
