import { NavLink } from "react-router-dom";

export const NotFound = ({ linkTo }: { linkTo: string }) => {
  return (
    <div className="px-4">
      <div className="flex items-center justify-center min-h-screen max-w-container mx-auto">
        <div className="flex flex-col items-center justify-center gap-6 px-4 pb-16 text-gray-600 w-[700px] mx-auto">
          <img src="/images/404.png" alt="404" width={631} height={343} />
          <h1 className="uppercase text-2xl font-semibold text-dark-green">
            la página que ha solicitado no está disponible
          </h1>

          <NavLink
            to={linkTo}
            className="flex items-center justify-center bg-dark-green rounded-xl text-white hover:text-primary hover:bg-other-blue font-opensans font-medium border hover:border-primary w-48 py-2 transition duration-300"
          >
            <span className="uppercase">de vuelta a casa</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
