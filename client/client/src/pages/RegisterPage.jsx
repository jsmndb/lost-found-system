import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
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

    <input placeholder="Name" style={inputStyle} />
    <input placeholder="Email" style={inputStyle} />
    <input type="password" placeholder="Password" style={inputStyle} />

    <button style={buttonStyle}>
      Register
    </button>
  </div>
</div>
  );
}

export default RegisterPage;