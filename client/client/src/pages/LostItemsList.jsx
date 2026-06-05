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

  return (
    <div>
      <h2>All Lost Items</h2>

      {items.length === 0 ? (
        <p>No lost items found</p>
      ) : (
        items.map((item) => (
          <div key={item.id}>
            <h3>{item.item_name}</h3>
            <p>{item.description}</p>
            <p>Location: {item.location}</p>
            <p>Date: {item.date_lost}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default LostItemsList;