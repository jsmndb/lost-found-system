import { useState } from "react";
import axios from "axios";

function LostItemForm() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = 1; // temporary (later we will get from token)

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

      // clear form
      setItemName("");
      setDescription("");
      setDateLost("");
      setLocation("");
    } catch (error) {
      console.log(error);
      alert("Failed to add lost item");
    }
  };

  return (
    <div>
      <h2>Report Lost Item</h2>

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
          value={dateLost}
          onChange={(e) => setDateLost(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Location Lost"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br /><br />

        <button type="submit">
          Submit Lost Item
        </button>
      </form>
    </div>
  );
}

export default LostItemForm;