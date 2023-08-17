import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";

// Pages
import { Home } from "../pages/home/Home";
import { NotFound } from "../pages/NotFound";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
