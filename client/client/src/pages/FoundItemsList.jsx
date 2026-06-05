import { useEffect, useState } from "react";
import axios from "axios";

function FoundItemsList() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/found-items"
      );

      setItems(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load found items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Found Items</h2>

      {items.length === 0 ? (
        <p>No found items yet</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{item.item_name}</h3>
            <p>{item.description}</p>
            <p>Location: {item.location}</p>
            <p>Date: {item.date_found}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default FoundItemsList;