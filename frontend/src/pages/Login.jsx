import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://expense-tracker-web-dashboard.onrender.com/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: Incorrect username or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-lg shadow-md w-11/12 max-w-xs"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          className="border p-2 w-full mb-3 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full mb-3 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 transition">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
