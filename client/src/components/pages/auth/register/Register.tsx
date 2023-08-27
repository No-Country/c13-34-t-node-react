import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../../context/auth";
import { TRole } from "../../../../types/user";
import { AxiosError } from "axios";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [genre, setGenre] = useState<"male" | "female">("male");
  const [role, setRole] = useState<TRole>("patient");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }
    setLoading(true);

    try {
      await signup({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        telephone,
        dateOfBirth: new Date(dateOfBirth).toISOString(),
        genre,
        role,
      });

      alert("Se ha registrado exitosamente");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          alert("Formulario Invalido");
        } else {
          alert("No se pudo establecer conexión con el Servidor!");
        }
      }
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full px-4 pt-0 pb-8 2xl:py-20 2xl:pl-0 2xl:pr-36 bg-white">
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-24">
        <div className="hidden 2xl:flex flex-col justify-center items-center relative">
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

        <div className="w-full 2xl:w-[502px] flex flex-col font-opensans">
          <h1 className="font-caudex text-primary-green text-5xl 2xl:text-6xl pb-8">
            Crea una cuenta
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full 2xl:w-[360px] flex flex-col gap-6"
          >
            <label className="block">
              <span className="block">Nombre(s) *</span>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
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
                required
                placeholder="Ingrese su contraseña"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Confirmar contraseña *</span>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                required
                placeholder="Confirmar contraseña"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Número de teléfono *</span>
              <input
                value={telephone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                required
                minLength={10}
                maxLength={10}
                placeholder="Ingrese su número de teléfono"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Fecha de nacimiento *</span>
              <input
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                type="date"
                required
                placeholder="Ingrese su fecha de nacimiento"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block">Genero *</span>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value as "male")}
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
                value={role}
                onChange={(e) => setRole(e.target.value as TRole)}
                required
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              >
                <option value="">Seleccione un tipo</option>
                <option value="patient">Paciente</option>
                <option value="doctor">Doctor</option>
              </select>
            </label>

            <button
              disabled={loading}
              type="submit"
              className="w-full 2xl:w-[360px] mt-5 py-2 rounded-xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300 disabled:bg-dark-green"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
