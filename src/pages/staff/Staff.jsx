import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStaff, saveStaff, deleteStaff } from "../../utils/staffStorage";
import { demoStaff } from "./staffData";
import "./staff.css";

export default function Staff() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = getStaff();
    if (data.length === 0) {
      saveStaff(demoStaff);
      setStaff(demoStaff);
    } else {
      setStaff(data);
    }
  }, []);

  const filtered = staff.filter(s => {
    const roleMatch = filter === "All" || s.role === filter;
    const searchMatch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase());
    return roleMatch && searchMatch;
  });

  const handleDelete = (id) => {
    if (window.confirm("Delete this staff member?")) {
      deleteStaff(id);
      setStaff(getStaff());
    }
  };

  return (
    <div className="staff">

      <div className="staff-header">
        <div>
          <h2>Staff Management</h2>
          <p>Manage hospital staff and personnel</p>
        </div>
        <button onClick={() => navigate("/staff/add")}>+ Add Staff Member</button>
      </div>

      <input
        className="staff-search"
        placeholder="Search staff by name or department..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="staff-filters">
        {["All", "Doctor", "Nurse", "Admin"].map(f => (
          <button 
            key={f} 
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="staff-list">
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
            No staff members found
          </p>
        ) : (
          filtered.map(s => (
            <div className="staff-card" key={s.id}>
              <div 
                className="staff-card-content"
                onClick={() => navigate(`/staff/${s.id}`)}
                style={{ flex: 1, cursor: "pointer" }}
              >
                <div className="avatar">{s.name.split(" ").map(w => w[0]).join("")}</div>
                <div className="staff-info">
                  <h3>{s.name} <span className="id">{s.id}</span></h3>
                  <p>{s.role} • {s.department}</p>
                  {s.specialization && <p>Specialization: {s.specialization}</p>}
                  <p>{s.email}</p>
                  <p>{s.phone}</p>
                </div>
                <span className={`status ${s.status === "On Duty" ? "active" : "leave"}`}>
                  {s.status}
                </span>
              </div>
              
              <button 
                className="delete-btn"
                onClick={() => handleDelete(s.id)}
                style={{ 
                  padding: "8px 12px", 
                  backgroundColor: "#e74c3c", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px", 
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
