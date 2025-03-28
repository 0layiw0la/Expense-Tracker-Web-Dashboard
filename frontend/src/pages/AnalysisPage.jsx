import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Analysis from "../components/Analysis";

function AnalysisPage({ expenses, refreshExpenses }) {
  useEffect(() => {
    refreshExpenses(); // Fetch latest expenses when AnalysisPage loads
  }, []);

  return (
    <div className="flex flex-col sm:flex-row min-h-screen md:gap-[8vw] ">
      <Sidebar />
      <div className="p-4 w-full ">
        <h2 className="text-2xl font-bold text-center md:text-left mb-4">Expense Analysis</h2>
        <Analysis expenses={expenses} />
      </div>
    </div>
  );
}

export default AnalysisPage;
