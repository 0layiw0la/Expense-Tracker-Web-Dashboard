import axios from "axios";

const ExpensesTable = ({ expenses, setExpenses }) => {
  const deleteExpense = async (id) => {
    await axios.delete(`/expenses/${id}`);
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td className="border p-2">{exp.title}</td>
              <td className="border p-2">${exp.amount}</td>
              <td className="border p-2">{exp.category}</td>
              <td className="border p-2">
                <button onClick={() => deleteExpense(exp.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
