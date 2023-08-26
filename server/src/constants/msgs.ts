export enum MESSAGES {
  SUCCESS = 'success',
  ADMIN = 'admin',
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  ENABLE = 'enable',
  DISABLE = 'disable',
  MALE = 'male',
  FEMALE = 'female',
  ADMIN_REGISTRATION_APPROVAL = 'approve',
  ADMIN_REGISTRATION_DISAPPROVAL = 'reject',
  ADMIN_TOGGLE_STATUS_OK = 'Cambio de estado del admin/doctor realizado con éxito',
  ADMIN_TOGGLE_STATUS_FAIL = 'No se pudo realizar el cambio del estado del admin/doctor',
  ADMIN_TOGGLE_STATUS_ERROR = 'Error al realizar el cambio del estado del admin/doctor',
  FIRST_NAME_REQUIRED_ERROR = 'El nombre es requerido.',
  FIRST_NAME_TYPE_ERROR = 'El nombre debe ser un texto.',
  FIRST_NAME_MIN_LENGTH = 'El nombre debe ser de mínimo 2 caracteres.',
  FIRST_NAME_MAX_LENGTH = 'El nombre excede la longitud máxima.',
  FIRST_NAME_PURE_STRING = 'El nombre no debe contener números',
  LAST_NAME_REQUIRED_ERROR = 'El apellido es requerido.',
  LAST_NAME_TYPE_ERROR = 'El apellido debe ser un texto.',
  LAST_NAME_MIN_LENGTH = 'El apellido debe ser de mínimo 2 caracteres.',
  LAST_NAME_MAX_LENGTH = 'El apellido excede la longitud máxima.',
  LAST_NAME_PURE_STRING = 'El apellido no debe contener números',
  EMAIL_REQUIRED_ERROR = 'El email es requerido.',
  EMAIL_TYPE_ERROR = 'El email debe ser un texto.',
  EMAIL_INVALID = 'El email es inválido.',
  EMAIL_ALREADY_REGISTERED = 'El email ya esta registrado.',
  EMAIL_NOT_REGISTERED = 'Email no registrado / cuenta desactivada.',
  GENRE_REQUIRED_ERROR = 'El género es requerido.',
  GENRE_TYPE_ERROR = 'El género debe ser femenino o masculino.',
  ROLE_REQUIRED_ERROR = 'El rol es requerido.',
  ROLE_TYPE_ERROR = 'El rol debe ser admin, paciente o doctor.',
  TELEPHONE_REQUIRED_ERROR = 'El teléfono es requerido.',
  TELEPHONE_TYPE_ERROR = 'El teléfono debe ser un número.',
  TELEPHONE_MIN_LENGTH = 'El teléfono debe ser de 10 dígitos.',
  TELEPHONE_MAX_LENGTH = 'El teléfono debe ser de 10 dígitos.',
  TELEPHONE_ONLY_NUMBERS = 'El teléfono debe contener solo números',
  PASSWORD_REQUIRED_ERROR = 'La contraseña es requerida.',
  PASSWORD_TYPE_ERROR = 'La contraseña debe ser un texto.',
  PASSWORD_MIN_LENGTH = 'La contraseña debe ser de mínimo 5 caracteres',
  PASSWORD_TOO_WEAK = 'La contraseña debe tener mínimo 8 caracteres, al menos un número, un mayúscula, un mínuscula y un caracter especial',
  DATE_OF_BIRTH_INVALID_DATE = 'La fecha indicada no existe',
  DATE_OF_BIRTH_DEFAULT_ERROR = 'Invalid date',
  DB_START_UP_OK = 'Base de datos levantada correctamente.',
  SERVER_CONNECTED_ON_PORT = 'Servidor conectado en el puerto'
}
