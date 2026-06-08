import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

  return (
    <div style={pageStyle}>
  <div
    style={{
      ...cardStyle,
      maxWidth: "400px",
      margin: "50px auto"
    }}
  >
    <h1>📍 Lost & Found System</h1>

    <input
      type="email"
      placeholder="Email"
      style={inputStyle}
    />

    <input
      type="password"
      placeholder="Password"
      style={inputStyle}
    />

    <button style={buttonStyle}>
      Login
    </button>

      <p style={{ marginTop: "15px" }}>
    Don't have an account?{" "}
    <Link to="/register">
      Register
    </Link>
  </p>
  </div>
</div>
  );
}


export default LoginPage;