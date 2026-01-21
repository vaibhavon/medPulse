import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/login";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Appointments from "./pages/appointments/Appointments";
import Billing from "./pages/billing/Billing";
import CreateInvoice from "./pages/billing/CreateInvoice";
import Staff from "./pages/staff/Staff";
import BloodBank from "./pages/blood/BloodBank";
import Donors from "./pages/Donors/Donors";
import Inquiry from "./pages/inquiry/Inquiry";
import PatientsLayout from "./pages/patients/PatientsLayout";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />

      {/* PROTECTED AREA */}
      <Route
        path="/"
        element={isLoggedIn ? <MainLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Navigate to="/dashboard" />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />

        {/* BILLING */}
        <Route path="billing" element={<Billing />} />
        <Route path="billing/create" element={<CreateInvoice />} />

        {/* PATIENTS (nested) */}
        <Route path="patients/*" element={<PatientsLayout />} />

        {/* OTHERS */}
        <Route path="staff" element={<Staff />} />
        <Route path="blood-bank" element={<BloodBank />} />
        <Route path="donors" element={<Donors />} />
        <Route path="inquiry" element={<Inquiry />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
