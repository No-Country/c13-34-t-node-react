import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../../context/auth";
import { TNewUser } from "../../../../types/user";
import { AxiosError } from "axios";
import { LoadingSpinner } from "../../../common/LoadingSpinner";
import { Modal } from "../../../common/Modal";
import { useFormik } from "formik";
import { registerSchema } from "../../../../schemas";

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const { signup } = useAuth();

  const register = async (values: TNewUser) => {
    setLoading(true);

    try {
      await signup(values);
      setLoading(false);
      if (values.role === "doctor" || values.role === "admin") {
        setMessage(
          "Registro exitoso. Debes esperar a ser aceptado por un administrador.",
        );
        setShowModal(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          alert("Formulario Invalido");
        } else {
          setMessage("No se pudo establecer conexión con el Servidor!");
          setShowModal(true);
        }
      }
      setLoading(false);
    }
  };

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        telephone: "",
        dateOfBirth: "",
        genre: "male",
        role: "patient",
      },
      validationSchema: registerSchema,
      onSubmit: (values: TNewUser) => {
        register(values);
      },
    });

  return (
    <div className="h-full w-full mt-20 xl:mt-0 px-4 pt-0 pb-8 2xl:py-20 2xl:pl-0 2xl:pr-36 bg-white">
      <Modal
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
          navigate("/");
        }}
        message={message}
      />
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
                value={values.firstName}
                onChange={handleChange}
                type="text"
                id="firstName"
                name="firstName"
                required
                placeholder="Ingrese su nombre"
                className={`${
                  errors.firstName &&
                  touched.firstName &&
                  "border-2 border-red-500"
                } ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray`}
              />
            </label>
            {errors.firstName && touched.firstName && (
              <p className="text-red-500">{errors.firstName}</p>
            )}
            <label className="block">
              <span className="block">Apellido(s) *</span>
              <input
                value={values.lastName}
                onChange={handleChange}
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Ingrese su nombre"
                className={`${
                  errors.lastName &&
                  touched.lastName &&
                  "border-2 border-red-500"
                } ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray`}
              />
            </label>
            {errors.lastName && touched.lastName && (
              <p className="text-red-500">{errors.lastName}</p>
            )}
            <label className="block">
              <span className="block">Correo Electrónico *</span>
              <input
                value={values.email}
                onChange={handleChange}
                id="email"
                name="email"
                required
                placeholder="Ingrese su correo electrónico"
                className={`${
                  errors.email && touched.email && "border-2 border-red-500"
                } ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray`}
              />
            </label>
            {errors.email && touched.email && (
              <p className="text-red-500">{errors.email}</p>
            )}
            <label className="block">
              <span className="block">Contraseña *</span>
              <input
                value={values.password}
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                required
                placeholder="Ingrese su contraseña"
                className={`${
                  errors.password &&
                  touched.password &&
                  "border-2 border-red-500"
                } ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray`}
              />
            </label>
            {errors.password && touched.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <label className="block">
              <span className="block">Confirmar contraseña *</span>
              <input
                value={values.confirmPassword}
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                placeholder="Confirmar contraseña"
                className={`${
                  errors.confirmPassword &&
                  touched.confirmPassword &&
                  "border-2 border-red-500"
                } ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray`}
              />
            </label>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
            <label className="block">
              <span className="block">Número de teléfono *</span>
              <input
                value={values.telephone}
                onChange={handleChange}
                type="text"
                name="telephone"
                id="telephone"
                required
                placeholder="Ingrese su número de teléfono"
                className={`${
                  errors.telephone &&
                  touched.telephone &&
                  "border-2 border-red-500"
                } ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray`}
              />
            </label>
            {errors.telephone && touched.telephone && (
              <p className="text-red-500">{errors.telephone}</p>
            )}
            <label className="block">
              <span className="block">Fecha de nacimiento *</span>
              <input
                value={values.dateOfBirth}
                onChange={handleChange}
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                required
                placeholder="Ingrese su fecha de nacimiento"
                className={`${
                  errors.dateOfBirth &&
                  touched.dateOfBirth &&
                  "border-2 border-red-500"
                } ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray`}
              />
            </label>
            {errors.dateOfBirth && touched.dateOfBirth && (
              <p className="text-red-500">{errors.dateOfBirth}</p>
            )}
            <label className="block">
              <span className="block">Genero *</span>
              <select
                value={values.genre}
                onChange={handleChange}
                id="genre"
                name="genre"
                required
                className={`${
                  errors.genre && "border-2 border-red-500"
                } ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray`}
              >
                <option value="">Seleccione un tipo</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </label>
            {errors.genre && touched.genre && (
              <p className="text-red-500">{errors.genre}</p>
            )}
            <label className="block">
              <span className="block">Cargo *</span>
              <select
                value={values.role}
                onChange={handleChange}
                id="role"
                name="role"
                required
                className={`${
                  errors.role && "border-2 border-red-500"
                } ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray`}
              >
                <option value="">Seleccione un tipo</option>
                <option value="patient">Paciente</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Administrador</option>
              </select>
            </label>
            {errors.role && touched.role && (
              <p className="text-red-500">{errors.role}</p>
            )}
            <button
              disabled={loading || isSubmitting}
              type="submit"
              className="w-full 2xl:w-[360px] mt-5 py-2 rounded-xl text-xl text-white hover:text-primary-green bg-primary-green hover:bg-white border-primary-green border transition duration-300"
            >
              {loading ? <LoadingSpinner /> : "Enviar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
