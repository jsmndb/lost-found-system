import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function FoundItemForm() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [dateFound, setDateFound] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    try {
      const response = await axios.post(
        "http://localhost:5000/lost-items",
        {
          user_id: userId,
          item_name: itemName,
          description,
          date_found: dateFound,
          location,
        }
      );

      alert(response.data.message);

      setItemName("");
      setDescription("");
      setDateFound("");
      setLocation("");
    } catch (error) {
      console.log(error);
      alert("Failed to add found item");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f4f6f9",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    card: {
      background: "#fff",
      width: "100%",
      maxWidth: "650px",
      padding: "25px",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },

    title: {
      marginTop: 0,
      marginBottom: "5px",
    },

    subtitle: {
      color: "#666",
      marginBottom: "25px",
    },

    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "bold",
    },

    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxSizing: "border-box",
      fontSize: "14px",
    },

    textarea: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxSizing: "border-box",
      minHeight: "100px",
      resize: "vertical",
      fontSize: "14px",
    },

    button: {
      width: "100%",
      padding: "12px",
      background: "#4d79ff",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>

          <h1
            style={{
              margin: "10px 0 5px 0",
              fontSize: "32px",
              fontWeight: "600"
            }}
          >
            📦Report Found Item
          </h1>

          <p
            style={{
              color: "#666",
              margin: "8px 0 0 0",
              fontSize: "14px"
            }}
          >
            Enter information about the item you found.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <label style={styles.label}>Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={styles.input}
            placeholder="e.g. Black Wallet"
            required
          />

          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            placeholder="Describe the item..."
            required
          />

          <label style={styles.label}>Date Found</label>
          <input
            type="date"
            value={dateFound}
            onChange={(e) => setDateFound(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Location Found</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
            placeholder="e.g. Library"
            required
          />

          <button type="submit" style={styles.button}>
            Submit Found Item
          </button>

        </form>

      </div>
    </div>
  );
}

export default FoundItemForm;