import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Expense Tracker</h2>
      <nav className="flex-1">
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="block p-2 bg-gray-700 rounded">Overview</Link>
          </li>
          <li className="mb-4">
            <Link to="/analysis" className="block p-2 bg-gray-700 rounded">Analysis</Link>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout} className="p-2 bg-red-600 rounded">Logout</button>
    </div>
  );
}

export default Sidebar;
