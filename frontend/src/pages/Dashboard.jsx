import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: "", date: "" });
  const [newExpense, setNewExpense] = useState({ category: "", amount: "", date: "" });

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
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch expenses");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://expense-tracker-web-dashboard.onrender.com/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (err) {
      setError("Failed to delete expense");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://expense-tracker-web-dashboard.onrender.com/expenses", newExpense, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExpenses((prev) => [...prev, res.data]); // Update state efficiently
      setNewExpense({ category: "", amount: "", date: "" });
    } catch (err) {
      setError("Failed to add expense");
    }
  };

  // ✅ Use useMemo to prevent unnecessary filtering recomputation
  const filteredExpenses = useMemo(() => {
    return expenses.filter((exp) => {
      return (
        (filters.category === "" || exp.category === filters.category) &&
        (filters.date === "" || exp.date === filters.date)
      );
    });
  }, [expenses, filters]); // Only recompute when expenses or filters change

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {/* Add Expense Form */}
        <form onSubmit={handleAddExpense} className="mb-4 flex gap-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newExpense.category}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="border p-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Expense
          </button>
        </form>

        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <select name="category" onChange={handleFilterChange} className="border p-2">
            <option value="">All Categories</option>
            {Array.from(new Set(expenses.map((exp) => exp.category))).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input type="date" name="date" onChange={handleFilterChange} className="border p-2" />
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Loading State */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Category</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={exp.id}>
                  <td className="border p-2">{exp.category}</td>
                  <td className="border p-2">{exp.amount}</td>
                  <td className="border p-2">{exp.date}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
