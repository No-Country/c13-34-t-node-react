import { NavLink } from "react-router-dom";
import { useState, ChangeEvent } from "react"; // Importa ChangeEvent

export const Register = () => {
  const [userType, setUserType] = useState(""); // Estado para almacenar el tipo de usuario seleccionado

  const handleUserTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
  };

  return (
    <div className="h-screen py-20 pl-0 pr-36">
      <div className="grid grid-cols-2 gap-24">
        <div className="flex flex-col justify-center items-center relative">
          <div className="absolute">
            <img
              src="/images/circles.png"
              alt="circles"
              className="w-[840px] h-[1200px]"
            />
          </div>
          <div className="text-center relative -left-20 -top-10">
            <h2 className="font-caudex text-5xl mb-2 font-bold text-dark-green tracking-[1px]">
              Registro de usuarios
            </h2>

            <div className="justify-center font-opensans w-[350px] tracking-[1px] text-black hover:text-white transition duration-300 ">
              <NavLink to="/Acceso">¿Ya tienes una cuenta? Inicia sesión</NavLink>
            </div>
          </div>
        </div>

        <div className="w-[502px] flex flex-col font-opensans">
          <h1 className="font-caudex text-primary-green text-5xl pb-4">
            Crea tu cuenta
          </h1>

          <form className="w-[360px] flex flex-col gap-6">
            <label className="block">
              <span className="block">Nombre *</span>
              <input
                type="text"
                name=""
                required
                placeholder="Ingresa tu nombre"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Número de documento *</span>
              <input
                type="text"
                name=""
                required
                placeholder="Ingresa tu número de documento"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Dirección *</span>
              <input
                type="text"
                name=""
                required
                placeholder="Ingresa tu dirección"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Número de teléfono *</span>
              <input
                type="text"
                name=""
                required
                placeholder="Ingresa tu número de teléfono"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Correo Electrónico *</span>
              <input
                type="text"
                name=""
                required
                placeholder="Ingresa tu correo electrónico"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Contraseña *</span>
              <input
                type="password"
                name=""
                required
                placeholder="Ingresa tu contraseña"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Confirmar contraseña *</span>
              <input
                type="password"
                name=""
                required
                placeholder="Confirma tu contraseña"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Tipo de Usuario *</span>
              <select
                value={userType}
                onChange={handleUserTypeChange}
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              >
                <option value="">Selecciona un tipo</option>
                <option value="doctor">Doctor</option>
                <option value="paciente">Paciente</option>
                <option value="administrador">Administrador</option>
              </select>
            </label>

            <button className="w-[360px] mt-14 py-3 rounded-3xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};