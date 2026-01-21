import { useEffect, useState } from "react";
import {
    getInquiries,
    updateInquiry,
    deleteInquiry
} from "../../utils/inquiryStorage";
import "./inquiry.css";

export default function Inquiry() {
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        setList(getInquiries());
    }, []);

    const changeStatus = (inq, status) => {
        updateInquiry({ ...inq, status });
        setList(getInquiries());
    };

    const removeInquiry = (id) => {
        if (window.confirm("Delete this inquiry?")) {
            deleteInquiry(id);
            setList(getInquiries());
        }
    };

    const filtered =
        filter === "All" ? list : list.filter(q => q.status === filter);

    return (
        <div className="inquiry">

            <div className="inquiry-header">
                <h2>Inquiries</h2>
                <p>All submitted complaints and inquiries</p>
            </div>

            <div className="inquiry-filters">
                {["All", "New", "In Progress", "Resolved"].map(f => (
                    <button
                        key={f}
                        className={filter === f ? "active" : ""}
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="inquiry-list">
                {filtered.length === 0 ? (
                    <p className="empty">No inquiries found</p>
                ) : (
                    filtered.map(q => (
                        <div className="inquiry-card" key={q.id}>

                            <div className="inq-left">
                                <h3>{q.name}</h3>
                                <p className="complaint">{q.complaint}</p>
                                <small>{q.date}</small>
                            </div>

                            <div className="inq-right">
                                <span className={`badge ${q.status.replace(" ", "").toLowerCase()}`}>
                                    {q.status}
                                </span>

                                <select
                                    value={q.status}
                                    onChange={(e) => changeStatus(q, e.target.value)}
                                >
                                    <option>New</option>
                                    <option>In Progress</option>
                                    <option>Resolved</option>
                                </select>

                                <button onClick={() => removeInquiry(q.id)}>Delete</button>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
