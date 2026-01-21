import { Routes, Route, Navigate } from "react-router-dom";
import Patients from "./Patients";
import AddPatient from "./AddPatients";
import EditPatient from "./EditPatients";
import PatientProfile from "./PatientsProfile";

export default function PatientsLayout() {
  return (
    <Routes>
      <Route index element={<Patients />} />
      <Route path="add" element={<AddPatient />} />
      <Route path="edit/:id" element={<EditPatient />} />
      <Route path=":id" element={<PatientProfile />} />
      <Route path="*" element={<Navigate to="/patients" />} />
    </Routes>
  );
}
