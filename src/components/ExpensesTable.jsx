import axios from "axios";

const ExpensesTable = ({ expenses, setExpenses }) => {
  const deleteExpense = async (id) => {
    await axios.delete(`/expenses/${id}`);
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  return (
    <table className="w-full border">
      <thead><tr><th>Title</th><th>Amount</th><th>Category</th><th>Action</th></tr></thead>
      <tbody>
        {expenses.map(exp => (
          <tr key={exp.id}>
            <td>{exp.title}</td>
            <td>${exp.amount}</td>
            <td>{exp.category}</td>
            <td><button onClick={() => deleteExpense(exp.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpensesTable;
