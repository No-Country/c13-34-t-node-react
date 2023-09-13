import { NavLink } from "react-router-dom";

export const Error = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center min-h-screen max-w-container mx-auto p-4 2xl:p-8">
      <div className="flex flex-col items-center justify-center gap-6 2xl:px-4 pb-16 text-gray-600 mx-auto">
        <img
          src="/images/error.png"
          alt="error"
          className="w-full 2xl:w-[1200px] rounded-md"
        />
        <h1 className="uppercase text-lg 2xl:text-2xl font-semibold text-dark-green text-center">
          {message}
        </h1>

        <NavLink
          to="/plataforma/paciente/reservar-cita"
          className="flex items-center justify-center bg-dark-green rounded-xl text-white hover:text-primary hover:bg-other-blue font-opensans font-medium border hover:border-primary w-48 py-2 transition duration-300"
        >
          <span className="uppercase">Reserve su cita</span>
        </NavLink>
      </div>
    </div>
  );
};
