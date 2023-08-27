import { useAuth } from "../../../../context/auth";
import { NavLink } from "react-router-dom";
import { AxiosError } from "axios";
import { useState } from "react";

export const Login = () => {
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }
    setLoading(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);
      alert("Bienvenido!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          alert("Correo o Contraseña incorrectos!");
        } else {
          alert("No se pudo establecer conexión con el Servidor!");
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="h-full w-full px-4 pt-0 pb-8 2xl:py-20 2xl:pl-0 2xl:pr-36 bg-white">
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-24">
        <div className="hidden 2xl:flex flex-col justify-center items-center relative">
          <div className="absolute">
            <img
              src="/images/circles.png"
              alt="circles"
              className="w-[840px] h-[1200px]"
            />
          </div>
          <div className="text-center relative -left-24 -top-10">
            <h2 className="font-caudex text-5xl mb-2 font-bold text-dark-green tracking-[1px]">
              Bienvenido
            </h2>
            <p className="font-opensans w-[350px] tracking-[1px]">
              ¡Nos alegra volver a verte! Inicie sesión para acceder a su
              cuenta.
            </p>
          </div>
        </div>

        <div className="w-full 2xl:w-[502px] flex flex-col font-opensans">
          <h1 className="font-caudex text-primary-green text-5xl 2xl:text-6xl pb-4">
            Acceso
          </h1>
          <div className="pb-8">
            <h1 className="text-2xl text-primary-green font-bold tracking-[1px]">
              ¡Estamos felices de verte!
            </h1>
            <p className="text-lg text-dark-green font-bold tracking-[1px]">
              Inicia sesión con tus datos
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="w-full 2xl:w-[360px] flex flex-col gap-6 max-sm:pb-4"
          >
            <label className="block">
              <span className="block">Correo Electrónico *</span>
              <input
                type="email"
                name="email"
                required
                placeholder="Ingrese su correo electrónico"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Contraseña *</span>
              <input
                type="password"
                name="password"
                required
                placeholder="Ingrese su contraseña"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 mb-0 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>
            <button
              disabled={loading}
              type="submit"
              className="w-full 2xl:w-[360px] mt-4 py-2 rounded-xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300 disabled:bg-dark-green"
            >
              Ingresar
            </button>
          </form>
          <div className="w-full 2xl:w-[360px] pt-2 grid grid-cols-2 justify-between text-primary-green">
            <NavLink to="/recuperar-contrasena">
              ¿Has olvidado tu contraseña?
            </NavLink>

            <div className="flex flex-col text-center">
              <NavLink to="/registro">
                ¿No tienes una cuenta? Regístrate ahora *
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
