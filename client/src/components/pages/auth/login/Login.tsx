// import { useAuth } from "../../../../context/auth";
import { useState } from "react";
import { useAuth } from "../../../../service/auth";

import { NavLink, Navigate } from "react-router-dom";

export const Login = () => {
  // const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to="plataforma" />;
  }

  // const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target as HTMLFormElement);
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;

  //   try {
  //     const success = await login(email, password);
  //     if (success) {
  //       console.log("Bienvenido");
  //     } else {
  //       console.log("Correo o contraseña inválidos");
  //     }
  //   } catch (error) {
  //     console.log("No se pudo establecer conexión con el servidor");
  //   }
  // };

  return (
    <div className="h-full py-20 pl-0 pr-36 bg-white">
      <div className="grid grid-cols-2 gap-24">
        <div className="flex flex-col justify-center items-center relative">
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

        <div className="w-[502px] flex flex-col font-opensans">
          <h1 className="font-caudex text-primary-green text-5xl pb-4">
            Acceso
          </h1>
          <p className="text-lg">¡Hola! ¿Le gustaría iniciar sesión como un</p>

          <div className="py-9 grid grid-cols-3 gap-6 text-primary-green text-center">
            <div className="px-4 py-2 rounded-2xl border-primary-green border-2 shadow-md">
              Doctor
            </div>
            <div className="px-4 py-2 rounded-2xl border-primary-green border-2 shadow-md">
              Paciente
            </div>
            <div className="px-4 py-2 rounded-2xl border-primary-green border-2 shadow-md">
              Administrador
            </div>
          </div>

          <form className="w-[360px] flex flex-col gap-6">
            <label className="block">
              <span className="block">Correo Electrónico *</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name=""
                required
                placeholder="Ingrese su correo electrónico"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Contraseña *</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name=""
                required
                placeholder="Ingrese su contraseña"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>
          </form>
          <div className="w-[360px] pt-2 grid grid-cols-2 justify-between text-primary-green">
            <NavLink to="/recuperar-contrasena">
              ¿Has olvidado tu contraseña?
            </NavLink>

            <div className="flex flex-col text-center">
              <NavLink to="/registro">
                ¿No tienes una cuenta? Regístrate ahora*
              </NavLink>
            </div>
          </div>

          <button className="w-[360px] mt-14 py-3 rounded-3xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300">
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};
