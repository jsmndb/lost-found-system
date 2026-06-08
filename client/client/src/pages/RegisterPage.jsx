import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  const pageStyle = {
    padding: "30px",
    fontFamily: "Arial",
    background: "#f4f6f9",
    minHeight: "100vh"
  };

  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  };

  const buttonStyle = {
    padding: "10px 20px",
    background: "#4d79ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px"
  };

  return (
    <div style={pageStyle}>
  <div
    style={{
      ...cardStyle,
      maxWidth: "450px",
      margin: "50px auto"
    }}
  >
    <h1>Create Account</h1>

      <input
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    style={inputStyle}
  />

      <input
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    style={inputStyle}
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={inputStyle}
  />

  <button
    style={buttonStyle}
    onClick={handleRegister}
  >
    Register
  </button>
  </div>
</div>
  );
}

export default RegisterPage;