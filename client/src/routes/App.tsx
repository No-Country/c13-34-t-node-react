import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// AuthProvider
import { AuthProvider } from "@/context/auth";
// import { AuthProvider } from "@/service/auth";

// Landing Pages
import { PublicLayout } from "@/components/pages/PublicLayout";
import { Home } from "@/components/pages/landing/home/Home";
import { AboutUs } from "@/components/pages/landing/about/AboutUs";
// import { ContactUs } from "@/components/pages/landing/contact/ContactUs";
// NoAuthenticated
import { NotAuthenticated } from "@/components/pages/NotAuthenticated";
import { Register } from "@/components/pages/auth/register/Register";
import { Login } from "@/components/pages/auth/login/Login";

// Authenticated
import { Authenticated } from "@/components/pages/Authenticated";
// Dashboard Pages
import { DashboardLayout } from "@/components/pages/dashboard/DashboardLayout";
// Admin
import { AdminDashboardPage } from "@/components/pages/dashboard/admin/dashboard/AdminDashboardPage";
import { AdminUsersPage } from "@/components/pages/dashboard/admin/users/AdminUsersPage";
import { AdminUserPage } from "@/components/pages/dashboard/admin/users/AdminUserPage";
import { AdminUserEditPage } from "@/components/pages/dashboard/admin/users/AdminUserEditPage";
import { AdminAppointmentsPage } from "@/components/pages/dashboard/admin/appointments/AdminAppointmentsPage";
import { AdminPatientsPage } from "@/components/pages/dashboard/admin/patients/AdminPatientsPage";
// Doctor
import { DoctorDashboardPage } from "@/components/pages/dashboard/doctor/dashboard/DoctorDashboardPage";
import { DoctorAppointmentsPage } from "@/components/pages/dashboard/doctor/appointments/DoctorAppointmentsPage";
import { DoctorPatientsPage } from "@/components/pages/dashboard/doctor/patients/DoctorPatientsPage";
import { DoctorPatientPage } from "@/components/pages/dashboard/doctor/patients/DoctorPatientPage";
import { DoctorSchedulePage } from "@/components/pages/dashboard/doctor/schedule/DoctorSchedulePage";
// Patient
import { PatientDashboardPage } from "@/components/pages/dashboard/patient/dashboard/PatientDashboardPage";
import { PatientAppointmentsPage } from "@/components/pages/dashboard/patient/appointments/PatientAppointmentsPage";
import { PatientBookAppointmentPage } from "@/components/pages/dashboard/patient/book-appointment/PatientBookAppointmentPage";
import { PatientDoctorsPage } from "@/components/pages/dashboard/patient/doctors/PatientDoctorsPage";
// import { PatientDoctorPage } from "@/components/pages/dashboard/patient/doctors/PatientDoctorPage";
import { PatientMedicalRecordsPage } from "@/components/pages/dashboard/patient/medical-records/PatientMedicalRecordsPage";
// 404
import { NotFound } from "@/components/pages/NotFound";

export const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<PublicLayout />}>
              <Route path="" element={<Home />} />
              <Route path="sobre-nosotros" element={<AboutUs />} />
              {/* <Route path="contacto" element={<ContactUs />} /> */}

              <Route element={<NotAuthenticated />}>
                <Route path="registro" element={<Register />} />
                <Route path="acceso" element={<Login />} />
              </Route>
            </Route>

            <Route element={<Authenticated />}>
              <Route path="plataforma" element={<DashboardLayout />}>
                {/* /plataforma/administrador/panel */}
                <Route path="administrador">
                  <Route
                    path=""
                    element={<Navigate to="/plataforma/administrador/panel" />}
                  />
                  <Route path="panel" element={<AdminDashboardPage />} />
                  <Route path="usuarios" element={<AdminUsersPage />} />
                  <Route path="usuarios/:userId" element={<AdminUserPage />} />
                  <Route
                    path="usuarios/editar/:userId"
                    element={<AdminUserEditPage />}
                  />
                  <Route path="citas" element={<AdminAppointmentsPage />} />
                  <Route path="pacientes" element={<AdminPatientsPage />} />
                  <Route
                    path="*"
                    element={
                      <NotFound linkTo="/plataforma/administrador/panel" />
                    }
                  />
                </Route>

                {/* /plataforma/doctor/panel */}
                <Route path="doctor">
                  <Route
                    path=""
                    element={<Navigate to="/plataforma/doctor/panel" />}
                  />
                  <Route path="panel" element={<DoctorDashboardPage />} />
                  <Route path="pacientes" element={<DoctorPatientsPage />} />
                  <Route
                    path="pacientes/:userId"
                    element={<DoctorPatientPage />}
                  />
                  <Route path="citas" element={<DoctorAppointmentsPage />} />
                  <Route path="cronograma" element={<DoctorSchedulePage />} />
                  <Route
                    path="*"
                    element={<NotFound linkTo="/plataforma/doctor/panel" />}
                  />
                </Route>

                {/* /plataforma/paciente/panel */}
                <Route path="paciente">
                  <Route
                    path=""
                    element={<Navigate to="/plataforma/paciente/panel" />}
                  />
                  <Route path="panel" element={<PatientDashboardPage />} />
                  <Route path="doctores" element={<PatientDoctorsPage />} />
                  <Route
                    path="reservar-cita"
                    element={<PatientBookAppointmentPage />}
                  />
                  <Route path="citas" element={<PatientAppointmentsPage />} />
                  <Route
                    path="registros-medicos"
                    element={<PatientMedicalRecordsPage />}
                  />
                  <Route
                    path="*"
                    element={<NotFound linkTo="/plataforma/paciente/panel" />}
                  />
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<NotFound linkTo="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};
