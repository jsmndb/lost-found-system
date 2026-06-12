import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            "http://localhost:5000/login",
            {
                email,
            password,
    }
    );

    if (response.data.message !== "Login successful") {
    alert(response.data.message);
    return;
    }

    localStorage.setItem("token", response.data.token);

    // Decode the token to get user information
    const decodedToken = jwtDecode(response.data.token);
    localStorage.setItem("user", JSON.stringify(decodedToken));

    alert(response.data.message);
    navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  fontFamily: "Arial",
  background: "#f4f6f9",
  boxSizing: "border-box"
};

const cardStyle = {
  background: "#fff",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "550px",
  boxSizing: "border-box"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#4d79ff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px"
};

const inputStyle = {      
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxSizing: "border-box"
};

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6f9",
      padding: "20px",
      boxSizing: "border-box"
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "420px"
      }}
    >

  <h1
    style={{
      textAlign: "center",
      marginBottom: "10px",
      fontSize: "2.2rem"
    }}
  >
    📍 Lost & Found System
  </h1>

  <p
    style={{
      textAlign: "center",
      color: "#666",
      marginBottom: "25px"
    }}
  >
    Welcome! Please Login to continue.
  </p>

      <input
        type="email"
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
        style={{
          ...buttonStyle,
          width: "100%"
        }}
        onClick={handleLogin}
      >
        Login
      </button>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  </div>
);
}


export default LoginPage;