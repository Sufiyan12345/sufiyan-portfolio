import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./presentation/layouts/MainLayout";
import Home from "./presentation/pages/Home/Home";
import Admin from "./presentation/pages/Admin/Admin";
import AdminLogin from "./presentation/pages/AdminLogin/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC WEBSITE */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={<Admin />}
        />

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;