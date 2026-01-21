import { useEffect, useState } from "react";
import { getDonors, deleteDonor } from "../../utils/bloodStorage";
import "./donors.css";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDonors(getDonors());
  }, []);

  const filtered = donors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.blood.toLowerCase().includes(search.toLowerCase()) ||
    d.phone.includes(search)
  );

  const handleDelete = (id) => {
    if (window.confirm("Delete this donor?")) {
      deleteDonor(id);
      setDonors(getDonors());
    }
  };

  return (
    <div className="donors">

      <div className="donors-header">
        <h2>Blood Donors</h2>
        <p>All registered blood donors</p>
      </div>

      <input
        className="donor-search"
        placeholder="Search by name, blood group, phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="donor-list">
        {filtered.length === 0 ? (
          <p className="empty">No donors found</p>
        ) : (
          filtered.map(d => (
            <div className="donor-card" key={d.id}>
              <div>
                <h3>{d.name}</h3>
                <p><b>Blood:</b> {d.blood}</p>
                <p><b>Phone:</b> {d.phone}</p>
                <p><b>Age:</b> {d.age || "—"}</p>
                <p><b>Last Donation:</b> {d.lastDonation || "Not available"}</p>
              </div>

              <button onClick={() => handleDelete(d.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
