import { NavLink } from "react-router-dom";

export const Error = ({
  message,
  linkTo,
  linkText,
}: {
  message: string;
  linkTo: string;
  linkText: string;
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen max-w-container mx-auto p-4 2xl:p-8">
      <div className="flex flex-col items-center justify-center gap-6 2xl:px-4 pb-16 text-gray-600 mx-auto">
        <h1 className="uppercase text-lg 2xl:text-2xl font-semibold text-dark-green text-center">
          {message}
        </h1>
        <NavLink
          to={linkTo}
          className="flex items-center justify-center bg-dark-green rounded-xl text-white hover:text-primary hover:bg-other-blue font-opensans font-medium border hover:border-primary w-64 py-2 transition duration-300"
        >
          <span className="uppercase">{linkText}</span>
        </NavLink>
      </div>
    </div>
  );
};
