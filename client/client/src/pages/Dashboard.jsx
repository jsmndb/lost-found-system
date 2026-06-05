import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lost & Found Dashboard</h1>
      <p>Welcome! Manage lost and found items below.</p>

      {/* CARDS CONTAINER */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        {/* LOST ITEM CARD */}
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/report-lost")}
        >
          <h3>📦 Report Lost</h3>
          <p>Add a lost item</p>
        </div>

        {/* FOUND ITEM CARD */}
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/report-found")}
        >
          <h3>🎯 Report Found</h3>
          <p>Add a found item</p>
        </div>

        {/* VIEW LOST ITEMS */}
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/lost-items")}
        >
          <h3>📋 Lost Items</h3>
          <p>View all lost items</p>
        </div>

        {/* VIEW FOUND ITEMS */}
        <div
          style={{
            border: "1px solid gray",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/found-items")}
        >
          <h3>📋 Found Items</h3>
          <p>View all found items</p>
        </div>

  <div
    style={{
      border: "2px solid gold",
      padding: "20px",
      width: "200px",
      borderRadius: "10px",
      cursor: "pointer"
    }}
    onClick={() => navigate("/matches")}
  >
    <h3>🧠 Smart Matches</h3>
    <p>Find possible matches</p>
  </div>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        style={{ marginTop: "30px", padding: "10px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;