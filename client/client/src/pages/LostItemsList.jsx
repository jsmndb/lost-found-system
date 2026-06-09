import { useEffect, useState } from "react";
import axios from "axios";

function LostItemsList() {
  const [items, setItems] = useState([]);

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

    container: {
      width: "100%",
      maxWidth: "900px",
      margin: "0 auto",
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
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>

          <h1
            style={{
              margin: "8px 0 0 0",
              fontSize: "32px",
              fontWeight: "600",
            }}
          >
            📋Lost Items
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            View all reported lost items.
          </p>
        </div>

        {/* LIST */}
        {items.length === 0 ? (
          <div style={styles.empty}>
            <p>No lost items found.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} style={styles.card}>
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
  );
}

export default LostItemsList;