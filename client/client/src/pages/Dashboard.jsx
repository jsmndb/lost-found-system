import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    lost: 0,
    found: 0,
    matches: 0
  });

  // 📊 FETCH STATS
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

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 🎨 STYLES
  const styles = {
    page: {
      padding: "30px",
      fontFamily: "Arial",
      background: "#f4f6f9",
      minHeight: "100vh"
    },

    header: {
      marginBottom: "25px"
    },

    title: {
      margin: 0,
      fontSize: "28px"
    },

    subtitle: {
      marginTop: "5px",
      color: "#666"
    },

    statsRow: {
      display: "flex",
      gap: "15px",
      marginBottom: "25px",
      flexWrap: "wrap"
    },

    statCard: (color) => ({
      flex: "1",
      minWidth: "150px",
      background: "#fff",
      padding: "15px",
      borderRadius: "12px",
      borderLeft: `6px solid ${color}`,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }),

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "15px"
    },

    card: {
      background: "#fff",
      padding: "15px",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    },

    cardGold: {
      background: "#fff",
      padding: "15px",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      border: "2px solid gold"
    },

    logoutContainer: {
      marginTop: "30px",
      display: "flex",
      justifyContent: "center"
    },

    logoutBtn: {
      padding: "10px 20px",
      background: "#ff4d4d",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer"
    }
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
          <h3>📦 Lost Items</h3>
          <h2>{stats.lost}</h2>
        </div>

        <div style={styles.statCard("#4d79ff")}>
          <h3>🎯 Found Items</h3>
          <h2>{stats.found}</h2>
        </div>

        <div style={styles.statCard("#28a745")}>
          <h3>🧠 Matches</h3>
          <h2>{stats.matches}</h2>
        </div>

      </div>

      {/* ACTION CARDS */}
      <div style={styles.grid}>

        <div style={styles.card} onClick={() => navigate("/report-lost")}>
          <h3>📦 Report Lost</h3>
          <p>Add lost item</p>
        </div>

        <div style={styles.card} onClick={() => navigate("/report-found")}>
          <h3>🎯 Report Found</h3>
          <p>Add found item</p>
        </div>

        <div style={styles.card} onClick={() => navigate("/lost-items")}>
          <h3>📋 Lost Items</h3>
          <p>View lost list</p>
        </div>

        <div style={styles.card} onClick={() => navigate("/found-items")}>
          <h3>📋 Found Items</h3>
          <p>View found list</p>
        </div>

        <div style={styles.cardGold} onClick={() => navigate("/matches")}>
          <h3>🧠 Smart Matches</h3>
          <p>Auto matching system</p>
        </div>

      </div>

      {/* LOGOUT */}
      <div style={styles.logoutContainer}>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Dashboard;