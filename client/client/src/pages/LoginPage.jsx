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

    alert(response.data.message);
    navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Lost and Found System</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>
       <p>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
        </p>
    </div>
  );
}


export default LoginPage;