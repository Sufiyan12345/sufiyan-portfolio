import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
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
          <Route
            path="/"
            element={<Home />}
          />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<Admin />}
        />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;