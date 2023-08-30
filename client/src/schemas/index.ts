import * as yup from "yup";

const passwordRules =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^_&*-]).{5,}$/;

export const registerSchema = yup.object().shape({
  firstName: yup.string().max(50, "Como máximo 50 caracteres"),
  lastName: yup.string().max(70, "Como máximo 70 caracteres"),
  email: yup
    .string()
    .email("Ingresa un email válido")
    .required("Campo Obligatorio"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        "La contraseña debe contener al menos 1 mayusc, 1 minusc, 1 número y un caracter especial",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Las contraseñas deben coincidir")
    .required("Required"),
  telephone: yup
    .string()
    .min(10, "Deben ser 10 caracteres")
    .max(10, "Deben ser 10 caracteres"),
  dateOfBirth: yup
    .date()
    .max(new Date(), "La fecha debe ser menor a la actual!")
    .required("Campo obligatorio"),
  genre: yup.string().oneOf(["male", "female"], "Dato invalido"),
  role: yup.string().oneOf(["patient", "doctor", "admin"], "Dato invalido"),
});
