import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { switchSystem } from "../../redux/ErpCrmSlice";
import { addInquiry } from "../../utils/inquiryStorage";
import "./login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);

  // ERP LOGIN
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // INQUIRY
  const [inqName, setInqName] = useState("");
  const [inqComplaint, setInqComplaint] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ---------------- ERP LOGIN ---------------- */

  const handleLogin = (system) => {
    setError("");
    setSuccess("");

    if (system === "ERP" && id === "ERP_100" && password === "erp@123") {
      dispatch(login({ system, id }));
      dispatch(switchSystem(system));
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  /* ---------------- INQUIRY SUBMIT ---------------- */

  const handleInquirySubmit = () => {
    setError("");
    setSuccess("");

    if (!inqName || !inqComplaint) {
      setError("Please fill all fields");
      return;
    }

    addInquiry({
      id: "INQ" + Date.now(),
      name: inqName,
      complaint: inqComplaint,
      status: "New",
      date: new Date().toLocaleString()
    });

    setSuccess("Inquiry submitted successfully");

    setInqName("");
    setInqComplaint("");
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`}>

      {/* ================= ERP LOGIN ================= */}
      <div className="form-container sign-up">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Admin Login</h1>

          <input
            type="text"
            placeholder="Enter ERP ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={() => handleLogin("ERP")}>
            Log In
          </button>

          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>

      {/* ================= INQUIRY ================= */}
      <div className="form-container sign-in">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Inquiry</h1>

          <input
            type="text"
            placeholder="Enter your name"
            value={inqName}
            onChange={(e) => setInqName(e.target.value)}
          />

          <textarea
            placeholder="Enter your complaint"
            value={inqComplaint}
            onChange={(e) => setInqComplaint(e.target.value)}
            rows="3"
          ></textarea>

          <button type="button" onClick={handleInquirySubmit}>
            Submit
          </button>

          {error && <p className="error-msg">{error}</p>}
          {success && <p style={{ color: "green", marginTop: 8 }}>{success}</p>}
        </form>
      </div>

      {/* ================= TOGGLE ================= */}
      <div className="toggle-container">
        <div className="toggle">

          <div className="toggle-panel toggle-left">
            <h1>Inquiry</h1>
            <p>Make a complaint</p>
            <button
              className="hidden"
              onClick={() => {
                setIsActive(false);
                setError("");
                setSuccess("");
              }}
            >
              ← here
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Admin Login</h1>
            <p>Switch to ERP</p>
            <button
              className="hidden"
              onClick={() => {
                setIsActive(true);
                setError("");
                setSuccess("");
              }}
            >
              ERP →
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;
