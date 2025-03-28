import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="md:w-[25vw]">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`md:hidden p-3  ml-2 fixed top-2 z-50
          ${open ? "left-50 bg-gray-800 text-white text-2xl" : "left-4 bg-white text-black text-2xl mb-2"}`}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white p-4 transition-all duration-300
          ${open ? "w-64" : "w-0"} overflow-hidden md:w-[25vw] p-[10px] md:block`}
        style={{
          paddingLeft: open ? "16px" : "0",
          paddingRight: open ? "16px" : "0",
          transition: "width 0.3s ease",
        }}
      >
        <h2 className="text-2xl text-white font-bold m-4 ml-2 mb-6 w-full ">Expense Tracker</h2>
        <nav className="flex-1 w-full">
          <ul>
            <li className="m-4 ml-2">
              <Link to="/dashboard" className="block p-2 bg-gray-700 rounded">
                Overview
              </Link>
            </li>
            <li className="m-4 ml-2">
              <Link to="/analysis" className="block p-2 bg-gray-700 rounded">
                Analysis
              </Link>
            </li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="p-2 m-4 ml-2 bg-red-600 rounded absolute bottom-5">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
