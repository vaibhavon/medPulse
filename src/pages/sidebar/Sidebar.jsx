import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import medlogo from "../../assets/medLogo.jpg"

export default function Sidebar() {
  const dispatch = useDispatch();   

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="logo">
          <img src={medlogo} alt="MedPulse" />
          <div>
            <h2>MedPulse</h2>
          <span>Hospital ERP</span>
          </div>
        </div>

         <ul className="menu">
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/patients">Patients</NavLink></li>
          <li><NavLink to="/appointments">Appointments</NavLink></li>
          <li><NavLink to="/billing">Billing</NavLink></li>
          <li><NavLink to="/staff">Staff</NavLink></li>
          <li><NavLink to="/blood-bank">Blood Bank</NavLink></li>
          <li><NavLink to="/donors">Donors</NavLink></li>
          <li><NavLink to="/inquiry">Inquiry</NavLink></li>

          <li className="logout" onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className="profile">
        <div className="avatar">VA</div>
        <div>
          <p>Vaibhav`s Admin</p>
          <small>admin@medpulse.com</small>
        </div>
      </div>
    </aside>
  );
}
