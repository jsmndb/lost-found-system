import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function FoundItemForm() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [dateFound, setDateFound] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    try {
      const formData = new FormData();

      formData.append("user_id", userId);
      formData.append("item_name", itemName);
      formData.append("description", description);
      formData.append("date_found", dateFound);
      formData.append("location", location);

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        "http://localhost:5000/found-items",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      setItemName("");
      setDescription("");
      setDateFound("");
      setLocation("");

      navigate("/found-items");
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

    card: {
      background: "#fff",
      width: "100%",
      maxWidth: "650px",
      padding: "25px",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
      fontSize: "14px",
      boxSizing: "border-box",
    },

    textarea: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      minHeight: "100px",
      resize: "vertical",
      fontSize: "14px",
      boxSizing: "border-box",
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

      {/* Back button (NOT affected) */}
      <button
        style={styles.backBtn}
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      {/* Center only the card */}
      <div style={styles.centerWrapper}>
        <div style={styles.card}>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1 style={{ margin: "10px 0 5px", fontSize: "32px" }}>
              📦 Report Found Item
            </h1>
            <p style={{ color: "#666", fontSize: "14px" }}>
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

            <label style={styles.label}>
              Upload Item Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              style={{
                marginBottom: "15px",
              }}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  border: "1px solid #ddd",
                }}
              />
            )}

            <button type="submit" style={styles.button}>
              Submit Found Item
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}

export default FoundItemForm;