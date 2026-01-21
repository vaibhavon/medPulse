import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import {
  getInvoices,
  saveInvoices,
  updateInvoice,
  deleteInvoice
} from "../../utils/billingStorage";
import "./billing.css";

const demoInvoices = [
  {
    id: "INV-2026-001",
    patientName: "Sarah Johnson",
    patientId: "P001",
    date: "2026-01-05",
    dueDate: "2026-01-20",
    amount: 1250,
    status: "Paid",
    services: ["Cardiac Consultation", "ECG Test"]
  },
  {
    id: "INV-2026-002",
    patientName: "Michael Chen",
    patientId: "P002",
    date: "2026-01-06",
    dueDate: "2026-01-21",
    amount: 3450,
    status: "Pending",
    services: ["Hospital Stay", "Medications"]
  }
];

export default function Billing() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const data = getInvoices();
    if (data.length === 0) {
      saveInvoices(demoInvoices);
      setInvoices(demoInvoices);
    } else {
      setInvoices(data);
    }
  }, []);

  const filtered = invoices.filter(inv => {
    const statusMatch = filter === "All" || inv.status === filter;
    const searchMatch =
      inv.patientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.patientId.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase());

    return statusMatch && searchMatch;
  });

  const totalRevenue = invoices.filter(i => i.status === "Paid")
    .reduce((a, b) => a + b.amount, 0);

  const pendingAmount = invoices.filter(i => i.status === "Pending")
    .reduce((a, b) => a + b.amount, 0);

  const overdueAmount = invoices.filter(i => i.status === "Overdue")
    .reduce((a, b) => a + b.amount, 0);

  const markAsPaid = (inv) => {
    updateInvoice({ ...inv, status: "Paid" });
    setInvoices(getInvoices());
  };

  const handleDeleteInvoice = (invId) => {
    if (window.confirm("Delete this invoice?")) {
      deleteInvoice(invId);
      setInvoices(getInvoices());
    }
  };

  const downloadInvoice = (inv) => {
    const doc = new jsPDF();

    doc.setFillColor(230,245,255);
    doc.rect(0,0,210,32,"F");

    doc.setFontSize(20);
    doc.setTextColor(0,70,140);
    doc.text("MEDPULSE HOSPITAL",105,18,{align:"center"});

    doc.setFontSize(12);
    doc.setTextColor(0,0,0);
    doc.text("Official Invoice Receipt",105,26,{align:"center"});

    let y = 45;
    doc.text(`Invoice ID: ${inv.id}`,10,y); y+=7;
    doc.text(`Patient: ${inv.patientName} (${inv.patientId})`,10,y); y+=7;
    doc.text(`Invoice Date: ${inv.date}`,10,y); y+=7;
    doc.text(`Due Date: ${inv.dueDate}`,10,y); y+=8;

    doc.text("Services:",10,y); y+=7;
    inv.services.forEach((s,i)=>{
      doc.text(`${i+1}. ${s}`,14,y); y+=6;
    });

    y+=8;
    doc.setFontSize(14);
    doc.text(`Total Amount: Rs${inv.amount}`,10,y);
    y+=7;
    doc.text(`Payment Status: ${inv.status}`,10,y);

    doc.save(inv.id+"_Invoice.pdf");
  };

  return (
    <div className="billing">

      {/* HEADER */}
      <div className="billing-header">
        <div>
          <h2>Billing & Invoices</h2>
          <p>Manage payments and financial records</p>
        </div>
        <button onClick={() => navigate("/billing/create")}>
          Create Invoice
        </button>
      </div>

      {/* STATS */}
      <div className="billing-stats">
        <div className="stat-card">
          <h4>Total Revenue</h4>
          <div className="amount">₹{totalRevenue}</div>
        </div>
        <div className="stat-card">
          <h4>Pending Payments</h4>
          <div className="amount">₹{pendingAmount}</div>
        </div>
        <div className="stat-card">
          <h4>Overdue Amount</h4>
          <div className="amount">₹{overdueAmount}</div>
        </div>
      </div>

      {/* SEARCH */}
      <input
        className="billing-search"
        placeholder="Search invoice..."
        value={search}
        onChange={e=>setSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div className="billing-filters">
        {["All","Paid","Pending","Overdue"].map(f=>(
          <button
            key={f}
            className={filter===f?"active":""}
            onClick={()=>setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="billing-list">
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
            No invoices found
          </p>
        ) : (
          filtered.map(inv => (
            <div className="invoice-card" key={inv.id}>
              <div className="invoice-left">
                <h3>
                  {inv.id}
                  <span className={`badge ${inv.status.toLowerCase()}`}>
                    {inv.status}
                  </span>
                </h3>
                <p><b>{inv.patientName}</b> ({inv.patientId})</p>
                <p>Due: {inv.dueDate}</p>
                <ul>{inv.services.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>

              <div className="invoice-right">
                <small>Amount</small>
                <h2>₹{inv.amount}</h2>

                <div className="invoice-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => downloadInvoice(inv)}
                  >
                    Download
                  </button>

                  {inv.status !== "Paid" && (
                    <button 
                      className="btn btn-dark"
                      onClick={() => markAsPaid(inv)}
                    >
                      Mark Paid
                    </button>
                  )}

                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDeleteInvoice(inv.id)}
                    style={{ backgroundColor: "#e74c3c", color: "white" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
