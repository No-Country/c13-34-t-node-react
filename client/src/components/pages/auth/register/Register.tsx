import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { useAuth } from "../../../../service/auth";
import { API_URL } from "../../../../constants/api";
import { AuthResponseError } from "../../../../types/types";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [genre, setGenre] = useState("");
  const [charge, setCharge] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // auth.signup(firstName, lastName, email, password, phone, genre, charge);

    try {
      const response = await fetch(`${API_URL}/api/v1/users/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone,
          genre,
          charge,
        }),
      });

      if (response.ok) {
        console.log("Usuario se creo correctamente");
        setErrorResponse("");

        goTo("/acceso");
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

  const genreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const chargeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCharge(e.target.value);
  };

  return (
    <div className="h-full py-20 pl-0 pr-36 bg-white">
      <div className="grid grid-cols-2 gap-24">
        <div className="flex flex-col justify-center items-center relative">
          <div className="absolute">
            <img
              src="/images/circles.png"
              alt="circles"
              className="w-[840px] h-[1480px]"
            />
          </div>
          <div className="text-center relative -left-28 -top-10">
            <h2 className="font-caudex text-5xl mb-2 font-bold text-dark-green tracking-[1px]">
              Registro de usuarios
            </h2>

            <div className="justify-center font-opensans w-[350px] tracking-[1px] text-black hover:text-white transition duration-300 ">
              <NavLink to="/acceso">
                ¿Ya tienes una cuenta? Inicia sesión
              </NavLink>
            </div>
          </div>
        </div>

        <div className="w-[502px] flex flex-col font-opensans">
          <form
            onSubmit={handleSubmit}
            className="w-[360px] flex flex-col gap-6"
          >
            <h1 className="font-caudex text-primary-green text-5xl pb-2">
              Crea una cuenta
            </h1>

            {!!errorResponse && (
              <div className="errorMessage">{errorResponse}</div>
            )}

            <label className="block">
              <span className="block">Nombre(s) *</span>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                name="firstName"
                required
                placeholder="Ingrese su nombre"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Apellido(s) *</span>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                name="lastName"
                required
                placeholder="Ingrese su nombre"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

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

            <label className="block">
              <span className="block">Confirmar contraseña *</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                required
                placeholder="Confirmar contraseña"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Número de teléfono *</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                name="number"
                required
                placeholder="Ingrese su número de teléfono"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Fecha de nacimiento *</span>
              <input
                type="string"
                name="text"
                required
                placeholder="Ingrese su fecha de nacimiento"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Genero *</span>
              <select
                value={genre}
                onChange={genreChange}
                required
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              >
                <option value="">Seleccione un tipo</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </label>

            <label className="block">
              <span className="block">Cargo *</span>
              <select
                value={charge}
                onChange={chargeChange}
                required
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              >
                <option value="">Seleccione un tipo</option>
                <option value="patiente">Paciente</option>
                <option value="doctor">Doctor</option>
              </select>
            </label>

            <button
              type="submit"
              className="w-[360px] mt-5 py-3 rounded-3xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
