import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStaff } from "../../utils/staffStorage";
import "./staff.css";

export default function AddStaff() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    role: "Doctor",
    department: "",
    specialization: "",
    email: "",
    phone: "",
    joinDate: ""
  });
  const [error, setError] = useState("");

  const handleSave = () => {
    setError("");

    if (!form.name || !form.role || !form.department || !form.email || !form.phone || !form.joinDate) {
      setError("All fields are required");
      return;
    }

    addStaff({
      ...form,
      id: "STF-" + Date.now(),
      status: "On Duty"
    });
    navigate("/staff");
  };

  return (
    <div className="staff">
      <h2>Add Staff Member</h2>

      <div className="staff-form">
        <input 
          placeholder="Full Name" 
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <select 
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option>Doctor</option>
          <option>Nurse</option>
          <option>Admin</option>
        </select>
        <input 
          placeholder="Department" 
          value={form.department}
          onChange={e => setForm({ ...form, department: e.target.value })}
        />
        <input 
          placeholder="Specialization (optional)" 
          value={form.specialization}
          onChange={e => setForm({ ...form, specialization: e.target.value })}
        />
        <input 
          placeholder="Email" 
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input 
          placeholder="Phone" 
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        <input 
          type="date" 
          value={form.joinDate}
          onChange={e => setForm({ ...form, joinDate: e.target.value })}
        />
        
        {error && <p className="error-msg">{error}</p>}
        
        <div className="form-actions">
          <button className="cancel" onClick={() => navigate("/staff")}>Cancel</button>
          <button className="save" onClick={handleSave}>Save Staff</button>
        </div>
      </div>
    </div>
  );
}
