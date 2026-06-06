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
      const userId = 1;

      const response = await axios.post(
        "http://localhost:5000/found-items",
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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Report Found Item</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <input
          type="date"
          value={dateFound}
          onChange={(e) => setDateFound(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Location Found"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br /><br />

        <button type="submit">
          Submit Found Item
        </button>
      </form>
    </div>
  );
}

export default FoundItemForm;