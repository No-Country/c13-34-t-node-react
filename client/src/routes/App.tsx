import { BrowserRouter, Routes, Route } from "react-router-dom";
// Provider routes
import { AuthProvider } from "../context/auth";

// Landing Page
import { PublicLayout } from "../components/pages/PublicLayout";
import { Home } from "../components/pages/landing/home/Home";

// Authentication
import { NoAuthenticated } from "../components/pages/NoAuthenticated";
import { Login } from "../components/pages/auth/login/Login";
import { Register } from "../components/pages/auth/register/Register";

// Accessibility
import { Authenticated } from "../components/pages/Authenticated";
import { DashboardLayout } from "../components/pages/dashboard/DashboardLayout";

// Not Found
import { NotFound } from "../components/pages/NotFound";

export const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<PublicLayout />}>
              <Route path="" element={<Home />} />

              <Route element={<NoAuthenticated />}>
                <Route path="acceso" element={<Login />} />
                <Route path="registro" element={<Register />} />
              </Route>
            </Route>

            <Route element={<Authenticated />}>
              <Route path="plataforma" element={<DashboardLayout />}>
                {/* /plataforma/doctor/pacientes */}
                <Route path="doctor">
                  <Route path="pacientes" element={<Home />} />
                  <Route path="citas" element={<Home />} />
                </Route>

                <Route path="paciente">
                  <Route path="historial" element={<Home />} />
                  <Route path="citas" element={<Home />} />
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
