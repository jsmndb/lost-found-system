import { useEffect, useState } from "react";
import axios from "axios";

function MatchItems() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("http://localhost:5000/match-items");
        setMatches(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ marginBottom: "20px" }}>
        🧠 Smart Match Results
      </h2>

      {matches.length === 0 ? (
        <p>No matches found</p>
      ) : (
        matches.map((match, index) => {

          const score = match.score || 0;

          return (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >

              {/* HEADER */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0 }}>Possible Match</h3>

                {/* BADGE */}
                <span
                  style={{
                    background:
                      score >= 80
                        ? "green"
                        : score >= 50
                        ? "orange"
                        : "gray",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    fontSize: "12px"
                  }}
                >
                  {score}% Match
                </span>
              </div>

              {/* CONTENT */}
              <div style={{ marginTop: "10px" }}>
                <p>
                  📦 <b>Lost:</b> {match.lost_item.item_name}
                </p>

                <p>
                  🎯 <b>Found:</b> {match.found_item.item_name}
                </p>
              </div>

              {/* FOOTER */}
              <p style={{ fontSize: "12px", color: "gray" }}>
                System auto-generated match
              </p>

            </div>
          );
        })
      )}
    </div>
  );
}

export default MatchItems;