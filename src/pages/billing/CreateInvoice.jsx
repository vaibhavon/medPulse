import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addInvoice } from "../../utils/billingStorage";
import "./billing.css";

export default function CreateInvoice() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patientName: "",
    patientId: "",
    date: "",
    dueDate: "",
    amount: "",
    services: "",
    status: "Pending"
  });

  const [error, setError] = useState("");

  const handleSave = () => {
    setError("");

    if (!form.patientName || !form.patientId || !form.date || !form.dueDate || !form.amount || !form.services) {
      setError("All fields are required");
      return;
    }

    if (Number(form.amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    const serviceList = form.services.split(",").map(s => s.trim()).filter(s => s);
    if (serviceList.length === 0) {
      setError("Please add at least one service");
      return;
    }

    addInvoice({
      ...form,
      id: "INV-" + Date.now(),
      amount: Number(form.amount),
      services: serviceList
    });

    navigate("/billing");
  };

  return (
    <div className="billing">
      <button 
        onClick={() => navigate("/billing")} 
        className="back-btn"
        style={{ marginBottom: "15px" }}
      >
        ← Back to Billing
      </button>

      <h2>Create Invoice</h2>

      <div className="modal" style={{ maxWidth: 500 }}>
        <div className="form-grid">
          <input 
            placeholder="Patient Name *"
            value={form.patientName}
            onChange={e => setForm({ ...form, patientName: e.target.value })}
          />
          <input 
            placeholder="Patient ID *"
            value={form.patientId}
            onChange={e => setForm({ ...form, patientId: e.target.value })}
          />
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Invoice Date *</label>
            <input 
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Due Date *</label>
            <input 
              type="date"
              value={form.dueDate}
              onChange={e => setForm({ ...form, dueDate: e.target.value })}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          </div>
          <input 
            placeholder="Amount *"
            type="number"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
          />
          <select 
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        <textarea 
          placeholder="Services (comma separated) *"
          value={form.services}
          onChange={e => setForm({ ...form, services: e.target.value })}
          style={{ minHeight: "80px" }}
        ></textarea>

        {error && <p className="error-msg">{error}</p>}

        <div className="modal-actions">
          <button className="cancel" onClick={() => navigate("/billing")}>Cancel</button>
          <button className="save" onClick={handleSave}>Create Invoice</button>
        </div>
      </div>
    </div>
  );
}
