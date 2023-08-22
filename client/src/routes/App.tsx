import { BrowserRouter, Routes, Route } from "react-router-dom";
// Provider routes
// import { AuthProvider } from "../context/auth";
import { AuthProvider } from "../service/auth";

// Landing Page
import { PublicLayout } from "../components/pages/PublicLayout";
import { Home } from "../components/pages/landing/home/Home";
import { AboutUs } from "../components/pages/landing/about/AboutUs";

// Authentication
import { NoAuthenticated } from "../components/pages/NoAuthenticated";
import { Login } from "../components/pages/auth/login/Login";
import { Register } from "../components/pages/auth/register/Register";

// Accessibility
import { Authenticated } from "../components/pages/Authenticated";
import { DashboardLayout } from "../components/pages/dashboard/DashboardLayout";

// Not Found
import { NotFound } from "../components/pages/NotFound";
import { DoctorPatientsPage } from "../components/pages/dashboard/doctor/patients/DoctorPatientsPage";
import { DoctorAppointmentsPage } from "../components/pages/dashboard/doctor/appointments/DoctorAppointmentsPage";
import { PatientAppointmentsPage } from "../components/pages/dashboard/patient/appointments/PatientAppointmentsPage";
import { PatientHistoryPage } from "../components/pages/dashboard/patient/history/PatientHistoryPage";

export const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<PublicLayout />}>
              <Route path="" element={<Home />} />
              <Route path="sobre-nosotros" element={<AboutUs />} />

              <Route element={<NoAuthenticated />}>
                <Route path="acceso" element={<Login />} />
                <Route path="registro" element={<Register />} />
              </Route>
            </Route>

            <Route element={<Authenticated />}>
              <Route path="plataforma" element={<DashboardLayout />}>
                {/* /plataforma/doctor/pacientes */}
                <Route path="doctor">
                  <Route path="pacientes" element={<DoctorPatientsPage />} />
                  <Route path="citas" element={<DoctorAppointmentsPage />} />
                </Route>

                <Route path="paciente">
                  <Route path="historial" element={<PatientHistoryPage />} />
                  <Route path="citas" element={<PatientAppointmentsPage />} />
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};
