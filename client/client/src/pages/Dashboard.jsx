import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the Lost and Found System</p>

      <button onClick={handleLogout}>
        Logout
      </button>

        <button onClick={() => navigate("/report-lost")}>
        Report Lost Item
      </button>

        <button onClick={() => navigate("/lost-items")}>
        View Lost Items
      </button>

        <button onClick={() => navigate("/report-found")}>
        Report Found Item
      </button>
    </div>
  );
}

export default Dashboard;