import { useEffect, useState } from "react";
import axios from "axios";

function MatchItems() {
  const [matches, setMatches] = useState([]);

  const fetchMatches = async () => {
    try {
      const response = await axios.get("http://localhost:5000/match-items");
      setMatches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
  <div style={{ padding: "20px" }}>
    <h2>Smart Match Results</h2>

    {matches.length === 0 ? (
      <p>No strong matches found</p>
    ) : (
      matches.map((match, index) => {
        console.log(match);
        return (
          <div
            key={index}
            style={{
              border: "2px solid green",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>
              Match Score: {match.score ? match.score : 0}%
            </h3>

            <p><b>Lost:</b> {match.lost_item.item_name}</p>
            <p><b>Found:</b> {match.found_item.item_name}</p>
          </div>
        );
      })
    )}
  </div>
  );
}

export default MatchItems;