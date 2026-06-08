import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    lost: 0,
    found: 0,
    matches: 0,
  });

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

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f4f6f9",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },

    header: {
      background: "#fff",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },

    title: {
      margin: 0,
      fontSize: "1.8rem",
    },

    subtitle: {
      color: "#666",
      marginTop: "5px",
    },

    statsRow: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      marginBottom: "20px",
    },

    statCard: (color) => ({
      flex: "1",
      minWidth: "180px",
      background: "#fff",
      padding: "15px",
      borderRadius: "16px",
      borderTop: `4px solid ${color}`,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }),

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "12px",
    },

    card: {
      background: "#fff",
      padding: "15px",
      borderRadius: "12px",
      cursor: "pointer",
      minHeight: "90px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },

    cardGold: {
      background: "#fff",
      padding: "15px",
      borderRadius: "12px",
      cursor: "pointer",
      minHeight: "90px",
      border: "2px solid gold",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },

    logoutContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "25px",
    },

    logoutBtn: {
      width: "150px",
      padding: "12px",
      background: "#ff4d4d",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "15px",
    },
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>📍 Lost & Found Dashboard</h1>
        <p style={styles.subtitle}>
          Manage lost and found items in one system
        </p>
      </div>

      {/* STATS */}
      <div style={styles.statsRow}>
        <div style={styles.statCard("#ff4d4d")}>
          <h3 style={{ margin: 0 }}>📦 Lost Items</h3>
          <h2 style={{ marginTop: "10px" }}>{stats.lost}</h2>
        </div>

        <div style={styles.statCard("#4d79ff")}>
          <h3 style={{ margin: 0 }}>🎯 Found Items</h3>
          <h2 style={{ marginTop: "10px" }}>{stats.found}</h2>
        </div>

        <div style={styles.statCard("#28a745")}>
          <h3 style={{ margin: 0 }}>🧠 Matches</h3>
          <h2 style={{ marginTop: "10px" }}>{stats.matches}</h2>
        </div>
      </div>

      {/* MENU CARDS */}
     <div
        style={styles.card}
        onClick={() => navigate("/report-lost")}
      >
        <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
          📦 Report Lost
        </h3>

        <p style={{ margin: 0, color: "#666" }}>
          Submit a lost item report.
        </p>
      </div>

        <div
          style={styles.card}
          onClick={() => navigate("/report-found")}
        >
          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
            🎯 Report Found
          </h3>

          <p style={{ margin: 0, color: "#666" }}>
            Submit a found item report.
          </p>
        </div>

        <div
          style={styles.card}
          onClick={() => navigate("/lost-items")}
        >
          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
            📋 Lost Items
          </h3>

          <p style={{ margin: 0, color: "#666" }}>
            View all lost items.
          </p>
        </div>

        <div
          style={styles.card}
          onClick={() => navigate("/found-items")}
        >
          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
            📋 Found Items
          </h3>

          <p style={{ margin: 0, color: "#666" }}>
            View all found items.
          </p>
        </div>

        <div
          style={styles.cardGold}
          onClick={() => navigate("/matches")}
        >
          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
            🧠 Smart Matches
          </h3>

          <p style={{ margin: 0, color: "#666" }}>
            Find possible item matches.
          </p>
        </div>

      {/* LOGOUT */}
      <div style={styles.logoutContainer}>
        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;