import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AnalysisPage from "./pages/AnalysisPage";

function App() {
  const [expenses, setExpenses] = useState([]);
  
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://expense-tracker-web-dashboard.onrender.com/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard expenses={expenses} refreshExpenses={fetchExpenses} />} />
        <Route path="/analysis" element={<AnalysisPage expenses={expenses} refreshExpenses={fetchExpenses} />} />
      </Routes>
    </Router>
  );
}

export default App;
