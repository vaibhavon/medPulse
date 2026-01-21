import { useEffect, useState } from "react";
import {
  getBloodStock,
  saveBloodStock,
  updateBloodUnit,
  addDonor,
  getDonors
} from "../../utils/bloodStorage";
import "./blood.css";

const defaultStock = [
  { type: "O+", units: 12 },
  { type: "O-", units: 6 },
  { type: "A+", units: 9 },
  { type: "A-", units: 4 },
  { type: "B+", units: 7 },
  { type: "B-", units: 3 },
  { type: "AB+", units: 5 },
  { type: "AB-", units: 2 }
];

export default function BloodBank() {
  const [stock, setStock] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [donor, setDonor] = useState({
    name: "",
    age: "",
    blood: "",
    phone: "",
    lastDonation: ""
  });

  useEffect(() => {
    const data = getBloodStock();
    if (data.length === 0) {
      saveBloodStock(defaultStock);
      setStock(defaultStock);
    } else {
      setStock(data);
    }
  }, []);

  const filtered = stock.filter(b =>
    b.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddDonor = () => {
    if (!donor.name || !donor.blood || !donor.phone) {
      alert("Name, Blood Group & Phone required");
      return;
    }

    addDonor({
      ...donor,
      id: "DON" + Date.now()
    });

    const existing = stock.find(b => b.type === donor.blood);
    if (existing) {
      updateBloodUnit(donor.blood, existing.units + 1);
      setStock(getBloodStock());
    }

    setDonor({ name: "", age: "", blood: "", phone: "", lastDonation: "" });
    setShowForm(false);
  };

  return (
    <div className="bloodbank">

      {/* HEADER */}
      <div className="blood-header">
        <div>
          <h2>Blood Bank</h2>
          <p>Check blood availability and manage donors</p>
        </div>
        <button onClick={() => setShowForm(true)}>+ Add Donor</button>
      </div>

      {/* SEARCH */}
      <input
        className="blood-search"
        placeholder="Search blood group (O+, A-, B+)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* BLOOD STOCK */}
      <div className="blood-grid">
        {filtered.map((b) => (
          <div key={b.type} className="blood-card">
            <h1>{b.type}</h1>
            <p>{b.units} Units Available</p>
            <span className={b.units <= 3 ? "low" : "ok"}>
              {b.units <= 3 ? "Low Stock" : "Available"}
            </span>
          </div>
        ))}
      </div>

      {/* ADD DONOR MODAL */}
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add New Blood Donor</h3>

            <input placeholder="Full Name"
              value={donor.name}
              onChange={e => setDonor({ ...donor, name: e.target.value })}
            />

            <input type="number" placeholder="Age"
              value={donor.age}
              onChange={e => setDonor({ ...donor, age: e.target.value })}
            />

            <select
              value={donor.blood}
              onChange={e => setDonor({ ...donor, blood: e.target.value })}
            >
              <option value="">Select Blood Group</option>
              {defaultStock.map(b => (
                <option key={b.type}>{b.type}</option>
              ))}
            </select>

            <input placeholder="Phone"
              value={donor.phone}
              onChange={e => setDonor({ ...donor, phone: e.target.value })}
            />

            <input type="date"
              value={donor.lastDonation}
              onChange={e => setDonor({ ...donor, lastDonation: e.target.value })}
            />

            <div className="modal-actions">
              <button className="cancel" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="save" onClick={handleAddDonor}>Save Donor</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
