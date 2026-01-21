import { useEffect, useState } from "react";
import {
  getAppointments,
  saveAppointments,
  addAppointment,
  deleteAppointment,
  updateAppointment
} from "../../utils/appoinmentStorage";

import "./appointments.css";

/* ---------------- DEFAULT DATA ---------------- */

const defaultAppointments = [
  {
    id: "APT001",
    patientName: "Sarah Johnson",
    patientId: "P001",
    doctor: "Dr. Mehta",
    department: "Cardiology",
    date: new Date().toISOString().split("T")[0],
    time: "09:30 AM",
    type: "Consultation",
    status: "Pending"
  },
  {
    id: "APT002",
    patientName: "Michael Chen",
    patientId: "P002",
    doctor: "Dr. Robert Kim",
    department: "Cardiology",
    date: new Date().toISOString().split("T")[0],
    time: "10:30 AM",
    status: "In Progress",
    type: "Follow-up"
  },
  {
    id: "APT003",
    patientName: "Emily Rodriguez",
    patientId: "P003",
    doctor: "Dr. Maria Garcia",
    department: "Obstetrics",
    date: new Date().toISOString().split("T")[0],
    time: "11:00 AM",
    status: "Scheduled",
    type: "Routine Checkup"
  },
  {
    id: "APT004",
    patientName: "James Wilson",
    patientId: "P004",
    doctor: "Dr. David Lee",
    department: "Endocrinology",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "02:00 PM",
    status: "Scheduled",
    type: "Consultation"
  }
];

/* ---------------- COMPONENT ---------------- */

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("today");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    patientName: "",
    patientId: "",
    doctor: "",
    department: "",
    date: "",
    time: "",
    type: "",
    status: "Pending"
  });

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {
    const data = getAppointments();
    if (data.length === 0) {
      saveAppointments(defaultAppointments);
      setAppointments(defaultAppointments);
    } else {
      setAppointments(data);
    }
  }, []);

  /* ---------------- DATE HELPERS ---------------- */

  const getDateOnly = (d) => new Date(d).toISOString().split("T")[0];

  const today = getDateOnly(new Date());
  const tomorrow = getDateOnly(new Date(Date.now() + 86400000));

  const filteredAppointments = appointments
    .filter(a => {
      if (filter === "today") return a.date === today;
      if (filter === "tomorrow") return a.date === tomorrow;
      if (filter === "upcoming") return a.date > today;
      return true;
    })
    .sort((a, b) => a.time.localeCompare(b.time));

  const shortTime = (time) =>
    time.replace(" AM", "").replace(" PM", "");

  const getSectionTitle = () => {
    if (filter === "today") return "Today's Appointments";
    if (filter === "tomorrow") return "Tomorrow's Appointments";
    if (filter === "upcoming") return "Upcoming Appointments";
    return "All Appointments";
  };

  /* ---------------- CRUD ---------------- */

  const handleSave = () => {
    if (!form.patientName || !form.date || !form.time)
      return alert("Patient, date and time required");

    if (editing) {
      updateAppointment({ ...editing, ...form });
    } else {
      addAppointment({ id: "APT" + Date.now(), ...form });
    }

    setAppointments(getAppointments());
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      patientName: "",
      patientId: "",
      doctor: "",
      department: "",
      date: "",
      time: "",
      type: "",
      status: "Pending"
    });
    setEditing(null);
  };

  const handleEdit = (apt) => {
    setEditing(apt);
    setForm(apt);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this appointment?")) {
      deleteAppointment(id);
      setAppointments(getAppointments());
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="appointments">

      <div className="appointments-header">
        <div>
          <h2>Appointments</h2>
          <p>Schedule and manage patient appointments</p>
        </div>
        <button onClick={() => setShowForm(true)}>+ New Appointment</button>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <button onClick={() => setFilter("today")} className={filter === "today" ? "active" : ""}>Today</button>
        <button onClick={() => setFilter("tomorrow")} className={filter === "tomorrow" ? "active" : ""}>Tomorrow</button>
        <button onClick={() => setFilter("upcoming")} className={filter === "upcoming" ? "active" : ""}>Upcoming</button>
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
      </div>

      {/* SECTION TITLE */}
      <h3 className="section-title">{getSectionTitle()}</h3>

      {/* LIST */}
      <div className="appointments-list">
        {filteredAppointments.length === 0 && (
          <p style={{ color: "#6b7280" }}>No appointments found.</p>
        )}

        {filteredAppointments.map(a => (
          <div key={a.id} className="appointment-card">

            <div className="appointment-left">
              <div className="time-circle">{shortTime(a.time)}</div>

              <div className="appointment-info">
                <h3>
                  {a.patientName}
                  <span className="pid">{a.patientId}</span>
                  <span className={`status ${a.status.toLowerCase().replace(" ", "")}`}>
                    {a.status}
                  </span>
                </h3>

                <div className="appointment-sub">
                  {a.doctor} • {a.department}
                </div>

                <div className="appointment-type">
                  {a.type}
                </div>
              </div>
            </div>

            <div className="appointment-right">
              <div className="appointment-time">⏰ {a.time}</div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button className="view-btn" onClick={() => handleEdit(a)}>Edit</button>
                <button className="view-btn" style={{ color: "red" }} onClick={() => handleDelete(a.id)}>Delete</button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{editing ? "Edit Appointment" : "New Appointment"}</h3>

            <div className="form-grid">
              <input placeholder="Patient Name" value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })} />
              <input placeholder="Patient ID" value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })} />
              <input placeholder="Doctor" value={form.doctor} onChange={e => setForm({ ...form, doctor: e.target.value })} />
              <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
              <input placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />

              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Done</option>
                <option>Scheduled</option>
                <option>Cancelled</option>
                <option>Critical</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="cancel" onClick={() => { setShowForm(false); resetForm(); }}>Cancel</button>
              <button className="save" onClick={handleSave}>{editing ? "Update" : "Save"}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
