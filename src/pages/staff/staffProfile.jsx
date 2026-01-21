import { useParams, useNavigate } from "react-router-dom";
import { getStaffById, updateStaff } from "../../utils/staffStorage";
import { useState, useEffect } from "react";
import "./staff.css";

export default function StaffProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const staffData = getStaffById(id);
    if (!staffData) {
      setError("Staff member not found");
      return;
    }
    setStaff(staffData);
  }, [id]);

  const toggleStatus = () => {
    const updated = {
      ...staff,
      status: staff.status === "On Duty" ? "On Leave" : "On Duty"
    };
    updateStaff(updated);
    setStaff(updated);
  };

  if (error) {
    return (
      <div className="staff">
        <h2>Staff Profile</h2>
        <p className="error-msg">{error}</p>
        <button onClick={() => navigate("/staff")} className="back-btn">← Back to Staff</button>
      </div>
    );
  }

  if (!staff) {
    return <div className="staff"><h2>Loading...</h2></div>;
  }

  return (
    <div className="staff">
      <button 
        onClick={() => navigate("/staff")} 
        className="back-btn" 
        style={{ marginBottom: "15px" }}
      >
        ← Back
      </button>
      
      <div className="profile-card">
        <h2>{staff.name}</h2>
        <p><b>ID:</b> {staff.id}</p>
        <p><b>Role:</b> {staff.role}</p>
        <p><b>Department:</b> {staff.department}</p>
        {staff.specialization && <p><b>Specialization:</b> {staff.specialization}</p>}
        <p><b>Status:</b> {staff.status}</p>
        <p><b>Email:</b> {staff.email}</p>
        <p><b>Phone:</b> {staff.phone}</p>
        <p><b>Joined:</b> {staff.joinDate}</p>

        <button 
          onClick={toggleStatus}
          style={{ marginTop: "15px", padding: "8px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Mark as {staff.status === "On Duty" ? "On Leave" : "On Duty"}
        </button>
      </div>
    </div>
  );
}
