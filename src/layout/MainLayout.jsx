import { Outlet } from "react-router-dom";
import Sidebar from "../pages/sidebar/Sidebar";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <div style={{ width: "200%" }}>
        <Outlet />   {/* All pages render here */}
      </div>
    </div>
  );
}
