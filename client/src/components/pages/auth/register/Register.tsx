import { NavLink, Navigate } from "react-router-dom";
import { useState, ChangeEvent } from "react"; // Importa ChangeEvent
import { useAuth } from "../../../../service/auth";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to="plataforma" />;
  }

  const [userType, setUserType] = useState(""); // Estado para almacenar el tipo de usuario seleccionado

  const handleUserTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
  };

  return (
    <div className="h-full py-20 pl-0 pr-36">
      <div className="grid grid-cols-2 gap-24">
        <div className="flex flex-col justify-center items-center relative">
          <div className="absolute">
            <img
              src="/images/circles.png"
              alt="circles"
              className="w-[840px] h-[1200px]"
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
          <h1 className="font-caudex text-primary-green text-5xl pb-6">
            Crea una cuenta
          </h1>

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

            <label className="block">
              <span className="block">Confirmar contraseña *</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name=""
                required
                placeholder="Confirmar contraseña"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Nombre completo *</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name=""
                required
                placeholder="Ingrese su nombre"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Genero *</span>
              <select
                value={userType}
                onChange={handleUserTypeChange}
                // required
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              >
                <option value="">Selecciona un tipo</option>
                <option value="doctor">Masculino</option>
                <option value="paciente">Femenino</option>
              </select>
            </label>

            <label className="block">
              <span className="block">Fecha de nacimiento *</span>
              <input
                type="text"
                name=""
                // required
                placeholder="Ingrese su fecha de nacimiento"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Número de teléfono *</span>
              <input
                type="number"
                name=""
                // required
                placeholder="Ingrese su número de teléfono"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Cargo *</span>
              <select
                value={userType}
                onChange={handleUserTypeChange}
                // required
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              >
                <option value="">Selecciona un tipo</option>
                <option value="paciente">Paciente</option>
                <option value="doctor">Doctor</option>
                <option value="administrador">Administrador</option>
              </select>
            </label>

            <button className="w-[360px] mt-5 py-3 rounded-3xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
