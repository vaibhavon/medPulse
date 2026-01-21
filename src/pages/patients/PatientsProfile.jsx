import { useParams, useNavigate } from "react-router-dom";
import { getPatientById, addMedicalHistory } from "../../utils/patientStorage";
import { useState } from "react";
import jsPDF from "jspdf";
import "./patients.css";

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState([]);

  const [record, setRecord] = useState({
    date: "", doctor: "", complaint: "", prescription: "", notes: ""
  });

  useEffect(() => {
    const patientData = getPatientById(id);
    if (patientData) {
      setPatient(patientData);
      setHistory(getMedicalHistory(id));
    }
  }, [id]);

  if (!patient) return <h2>Patient not found</h2>;

  /* --------- ADD MEDICAL HISTORY --------- */

  const handleAdd = () => {
    if (!record.date || !record.doctor) return alert("Date and Doctor required");
    addMedicalHistory(id, record);
    setHistory(getMedicalHistory(id));
    setRecord({ date: "", doctor: "", complaint: "", prescription: "", notes: "" });
  };

  /* --------- DOWNLOAD REPORT (PDF) --------- */

 const downloadReport = () => {
  const doc = new jsPDF();
  let y = 15;

  /* -------- HEADER -------- */

  doc.setFillColor(230, 245, 255); // light blue
  doc.rect(0, 0, 210, 30, "F");

  doc.setFontSize(20);
  doc.setTextColor(0, 70, 140);
  doc.text("MEDPULSE HOSPITAL", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Patient Medical Report", 105, 23, { align: "center" });

  y = 40;

  /* -------- PATIENT DETAILS -------- */

  doc.setFontSize(12);
  doc.text(`Patient ID: ${patient.id}`, 10, y); y += 7;
  doc.text(`Name: ${patient.name}`, 10, y); y += 7;
  doc.text(`Age: ${patient.age}`, 10, y); y += 7;
  doc.text(`Gender: ${patient.gender}`, 10, y); y += 7;
  doc.text(`Phone: ${patient.phone}`, 10, y); y += 7;
  doc.text(`Email: ${patient.email}`, 10, y); y += 7;
  doc.text(`Diagnosis: ${patient.diagnosis}`, 10, y); y += 5;

  /* -------- DIVIDER LINE -------- */

  doc.line(10, y, 200, y);
  y += 10;

  /* -------- MEDICAL HISTORY -------- */

  doc.setFontSize(14);
  doc.text("Medical History", 10, y);
  y += 8;

  doc.setFontSize(11);

  if (patient.history.length === 0) {
    doc.text("No previous medical records.", 10, y);
  } else {
    patient.history.forEach((h, index) => {
      doc.setFont(undefined, "bold");
      doc.text(`Checkup ${index + 1}`, 10, y); 
      y += 6;

      doc.setFont(undefined, "normal");
      doc.text(`Date: ${h.date}`, 12, y); y += 6;
      doc.text(`Doctor: ${h.doctor}`, 12, y); y += 6;
      doc.text(`Complaint: ${h.complaint}`, 12, y); y += 6;
      doc.text(`Prescription: ${h.prescription}`, 12, y); y += 6;
      doc.text(`Notes: ${h.notes}`, 12, y); y += 10;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
  }

  doc.save(`${patient.name}_Medical_Report.pdf`);
};


  return (
    <div className="patients">

      <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
        <button className="back-btn" onClick={() => navigate("/patients")}>← Back</button>
        <button className="download-btn" onClick={downloadReport}>Download Report</button>
      </div>

      <div className="profile-card">
        <h2>{patient.name}</h2>
        <p><b>ID:</b> {patient.id}</p>
        <p><b>Age:</b> {patient.age}</p>
        <p><b>Gender:</b> {patient.gender}</p>
        <p><b>Phone:</b> {patient.phone}</p>
        <p><b>Email:</b> {patient.email}</p>
        <p><b>Diagnosis:</b> {patient.diagnosis}</p>
      </div>

      <h3>Medical History</h3>

      {history.map((h, i) => (
        <div className="history-card" key={i}>
          <p><b>Date:</b> {h.date}</p>
          <p><b>Doctor:</b> {h.doctor}</p>
          <p><b>Complaint:</b> {h.complaint}</p>
          <p><b>Prescription:</b> {h.prescription}</p>
          <p><b>Notes:</b> {h.notes}</p>
        </div>
      ))}

      <h3>Add New Checkup</h3>

      <div className="patient-form">
        <input 
          type="date" 
          value={record.date}
          onChange={e => setRecord({ ...record, date: e.target.value })} 
        />
        <input 
          placeholder="Doctor" 
          value={record.doctor}
          onChange={e => setRecord({ ...record, doctor: e.target.value })} 
        />
        <input 
          placeholder="Complaint" 
          value={record.complaint}
          onChange={e => setRecord({ ...record, complaint: e.target.value })} 
        />
        <input 
          placeholder="Prescription" 
          value={record.prescription}
          onChange={e => setRecord({ ...record, prescription: e.target.value })} 
        />
        <textarea 
          placeholder="Notes" 
          value={record.notes}
          onChange={e => setRecord({ ...record, notes: e.target.value })}
        ></textarea>

        <button onClick={handleAdd} className="save">Save Record</button>
      </div>
    </div>
  );
}
