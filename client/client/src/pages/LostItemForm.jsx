import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function LostItemForm() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [dateLost, setDateLost] = useState("");
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
          date_lost: dateLost,
          location,
        }
      );

      alert(response.data.message);

      setItemName("");
      setDescription("");
      setDateLost("");
      setLocation("");
    } catch (error) {
      console.log(error);
      alert("Failed to add lost item");
    }
  };

  const pageStyle = {
    padding: "30px",
    fontFamily: "Arial",
    background: "#f4f6f9",
    minHeight: "100vh"
  };

  const cardStyle = {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "0 auto"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>

        <h1>📦 Report Lost Item</h1>

        <p style={{ color: "#666", marginBottom: "20px" }}>
          Enter details about the lost item.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />

          <input
            type="date"
            value={dateLost}
            onChange={(e) => setDateLost(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Location Lost"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Submit Lost Item
          </button>

        </form>

      </div>
    </div>
  );
}

export default LostItemForm;