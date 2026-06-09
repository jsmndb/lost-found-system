import { useEffect, useState } from "react";
import axios from "axios";

function MatchItems() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/match-items"
        );

        setMatches(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMatches();
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
      borderRadius: "10px",
      padding: "5px",
      marginBottom: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      borderLeft: "4px solid gold",
    },

    empty: {
      textAlign: "center",
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },

    badge: (score) => ({
      background:
        score >= 80
          ? "#28a745"
          : score >= 50
          ? "#ff9800"
          : "#6c757d",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "bold",
    }),
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
            🧠Smart Matches
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            Possible matches between lost and found items.
          </p>
        </div>

        {/* MATCH LIST */}
        {matches.length === 0 ? (
          <div style={styles.empty}>
            <p>No matches found.</p>
          </div>
        ) : (
          matches.map((match, index) => {
            const score = match.score || 0;

            return (
              <div key={index} style={styles.card}>

                {/* TOP ROW */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      color: "#333",
                      fontSize: "15px",
                    }}
                  >
                    Possible Match
                  </h3>

                  <span style={styles.badge(score)}>
                    {score}% Match
                  </span>
                </div>

                {/* LOST ITEM */}
                <div
                  style={{
                    background: "#fafafa",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    fontSize: "15px",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    📦 <strong>Lost Item:</strong>{" "}
                    {match.lost_item.item_name}
                  </p>
                </div>

                {/* FOUND ITEM */}
                <div
                  style={{
                    background: "#fafafa",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "15px",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    🎯 <strong>Found Item:</strong>{" "}
                    {match.found_item.item_name}
                  </p>
                </div>

                {/* FOOTER */}
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  System auto-generated match suggestion
                </p>

              </div>
            );
          })
        )}

      </div>
    </div>
  );
}

export default MatchItems;