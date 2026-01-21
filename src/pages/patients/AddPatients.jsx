import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPatient } from "../../utils/patientStorage";
import "./patients.css";

export default function AddPatient() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", age: "", gender: "", phone: "", email: "", diagnosis: "" });

  const handleSave = () => {
    if (!form.name || !form.age) return alert("Name and Age required");

    addPatient({
      id: "P" + Date.now(),
      ...form,
      status: "Active"
    });

    navigate("/patients");
  };

  return (
    <div className="patients">
      <h2>Add New Patient</h2>

      <div className="patient-form">
        <input 
          placeholder="Full Name" 
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input 
          placeholder="Age" 
          type="number" 
          value={form.age}
          onChange={e => setForm({...form, age: e.target.value})}
        />
        <input 
          placeholder="Gender" 
          value={form.gender}
          onChange={e => setForm({...form, gender: e.target.value})}
        />
        <input 
          placeholder="Phone" 
          value={form.phone}
          onChange={e => setForm({...form, phone: e.target.value})}
        />
        <input 
          placeholder="Email" 
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
        />
        <textarea 
          placeholder="Diagnosis" 
          value={form.diagnosis}
          onChange={e => setForm({...form, diagnosis: e.target.value})}
        ></textarea>

        <div className="form-actions">
          <button onClick={() => navigate("/patients")} className="cancel">Cancel</button>
          <button onClick={handleSave} className="save">Save</button>
        </div>
      </div>
    </div>
  );
}
