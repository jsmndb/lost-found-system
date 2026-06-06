import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ lost: 0, found: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      
      <h1>Lost & Found Dashboard</h1>
      <p>Welcome! Manage lost and found items below.</p>

    <div style={{ marginBottom: "20px" }}>
    <h2>System Stats</h2>

    <p>📦 Lost Items: {stats.lost}</p>
    <p>🎯 Found Items: {stats.found}</p>
  </div>

      {/* CARDS CONTAINER */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        {/* LOST ITEM CARD */}
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/report-lost")}
        >
          <h3>📦 Report Lost</h3>
          <p>Add a lost item</p>
        </div>

        {/* FOUND ITEM CARD */}
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/report-found")}
        >
          <h3>🎯 Report Found</h3>
          <p>Add a found item</p>
        </div>

        {/* VIEW LOST ITEMS */}
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/lost-items")}
        >
          <h3>📋 Lost Items</h3>
          <p>View all lost items</p>
        </div>

        {/* VIEW FOUND ITEMS */}
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/found-items")}
        >
          <h3>📋 Found Items</h3>
          <p>View all found items</p>
        </div>

  <div
    style={{
      border: "2px solid gold",
      padding: "20px",
      width: "200px",
      borderRadius: "10px",
      cursor: "pointer"
    }}
    onClick={() => navigate("/matches")}
  >
    <h3>🧠 Smart Matches</h3>
    <p>Find possible matches</p>
  </div>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        style={{ marginTop: "30px", padding: "10px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;