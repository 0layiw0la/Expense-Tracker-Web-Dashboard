import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://expense-tracker-web-dashboard.onrender.com/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white w-11/12 p-6 rounded-lg shadow-md max-w-xs">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input className="border p-2 w-full mb-2" type="text" name="username" placeholder="Username" onChange={handleChange} required/>
        <input className="border p-2 w-full mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} required/>
        <button className="bg-blue-500 text-white px-4 w-full py-2 rounded-md hover:bg-blue-600 transition mb-2">Sign Up</button>
        <a href="/login">
        <div className="mt-2 w-full text-center bg-[#d9dbde] text-black px-4 w-full py-2 rounded-md hover:bg-[#c1c3c7] transition">
        Already signed up? Login
        </div>
        </a>
      </form>
    </div>
  );
}

export default Register;
