import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Analysis({ expenses }) {
  const [totalSpent, setTotalSpent] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    processExpenses();
  }, [expenses]);

  const processExpenses = () => {
    if (!expenses.length) {
      setTotalSpent(0);
      setCategoryData([]);
      return;
    }

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalSpent(total);

    const categoryMap = {};
    expenses.forEach((exp) => {
      categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
    });

    setCategoryData(Object.keys(categoryMap).map((cat) => ({ category: cat, amount: categoryMap[cat] })));
  };

  return (
    <div className="p-4">

      {/* Total Spending & Top Category */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4 sm:items-center">
        <div className="bg-blue-500 sm:w-[60%] text-white p-4 rounded flex-1 text-center">
          <h3 className="text-lg font-semibold">Total Spent</h3>
          <p className="text-2xl">₦{totalSpent}</p>
        </div>
        <div className="bg-green-500 sm:w-[60%] text-white p-4 rounded flex-1 text-center">
          <h3 className="text-lg font-semibold">Top Category</h3>
          <p className="text-2xl">
            {categoryData.length ? categoryData.reduce((a, b) => (a.amount > b.amount ? a : b)).category : "N/A"}
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <h3 className="text-lg font-semibold mb-2 text-center">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#4A90E2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analysis;
