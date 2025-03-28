import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Analysis from "../components/Analysis";

function AnalysisPage({ expenses, refreshExpenses }) {
  useEffect(() => {
    refreshExpenses(); // Fetch latest expenses when AnalysisPage loads
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold mb-4">Expense Analysis</h2>
        <Analysis expenses={expenses} />
      </div>
    </div>
  );
}

export default AnalysisPage;
