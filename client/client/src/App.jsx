import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import LostItemForm from "./pages/LostItemForm";
import LostItemsList from "./pages/LostItemsList";
import FoundItemForm from "./pages/FoundItemForm";
import FoundItemsList from "./pages/FoundItemsList";
import MatchItems from "./pages/MatchItems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-lost" element={<LostItemForm />} />
        <Route path="/lost-items" element={<LostItemsList />} />
        <Route path="/report-found" element={<FoundItemForm />} />
        <Route path="/found-items" element={<FoundItemsList />} />
        <Route path="/matches" element={<MatchItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;