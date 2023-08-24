// import { useAuth } from "../../../../context/auth";
import { useState } from "react";
import { useAuth } from "../../../../service/auth";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../../../../constants/api";
import { AuthResponse, AuthResponseError } from "../../../../types/types";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const auth = useAuth();
  const goTo = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch(`${API_URL}/api/v1/users/auth/signin`, {
        method: "POST",
        headers: {
          "Conten-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log("Usuario conectado correctamente");
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
          goTo("/plataforma");
        }
      } else {
        console.log("Algo salió mal");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="plataforma" />;
  }

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

          <form
            onSubmit={handleSubmit}
            className="w-[360px] flex flex-col gap-6"
          >
            {!!errorResponse && (
              <div className="errorMessage">{errorResponse}</div>
            )}

            <label className="block">
              <span className="block">Correo Electrónico *</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                required
                placeholder="Ingrese su contraseña"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>
            <button
              type="submit"
              className="w-[360px] mt-4 py-3 rounded-3xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300"
            >
              Ingresar
            </button>
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
        </div>
      </div>
    </div>
  );
};
