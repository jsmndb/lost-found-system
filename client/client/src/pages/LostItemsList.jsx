import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LostItemsList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/lost-items"
      );

      setItems(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load lost items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f4f6f9",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },

    backBtn: {
      background: "transparent",
      border: "none",
      color: "#666",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      marginTop: "25px",
      justifyContent: "left",
      display: "flex",
      alignItems: "left",
    },

    centerWrapper: {
      minHeight: "calc(100vh - 60px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    container: {
      width: "100%",
      maxWidth: "900px",
    },

    header: {
      textAlign: "center",
      marginBottom: "30px",
    },

    card: {
      background: "#fff",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "15px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      borderLeft: "5px solid #ff4d4d",
    },

    title: {
      margin: "0 0 10px 0",
      color: "#333",
    },

    text: {
      margin: "6px 0",
      color: "#555",
    },

    empty: {
      textAlign: "center",
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
  };

  return (
    <div style={styles.page}>

      <button
        style={styles.backBtn}
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      {/* CENTER AREA */}
      <div style={styles.centerWrapper}>

        <div style={styles.container}>

          {/* HEADER */}
          <div style={styles.header}>
            <h1 style={{ fontSize: "32px", margin: 0 }}>
              📋 Lost Items
            </h1>
            <p style={{ color: "#666", fontSize: "14px" }}>
              View all reported lost items.
            </p>
          </div>

          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="Search item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px"
            }}
          />

          {/* LIST */}
          {items.length === 0 ? (
            <div style={styles.empty}>
              <p>No lost items found.</p>
            </div>
          ) : (
            items
              .filter((item) =>
                item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
              <div key={item.id} style={styles.card}>

              {item.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.item_name}
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                />
              )}

              <h3 style={styles.title}>
                {item.item_name}
              </h3>

                <p style={styles.text}>
                  <strong>Description:</strong> {item.description}
                </p>

                <p style={styles.text}>
                  <strong>Location:</strong> {item.location}
                </p>

                <p style={styles.text}>
                  <strong>Date Lost:</strong> {item.date_lost}
                </p>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default LostItemsList;