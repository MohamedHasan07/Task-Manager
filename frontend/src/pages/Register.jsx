import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {


  const navigate = useNavigate();

  // ⭐ REQUIRED STATES
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const [message, setMessage] = useState("");   // ⭐ ADD THIS
  const [success, setSuccess] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    // ⭐ FRONTEND VALIDATION (fixed)
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setSuccess(false);
      return setMessage("All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setSuccess(false);
      return setMessage("Invalid email format");
    }

    if (form.password.length < 4) {
      setSuccess(false);
      return setMessage("Password must be at least 4 characters");
    }

    try {
      const res = await API.post("/auth/register", form);

      setSuccess(true);
      setMessage(res.data.message || "Account created successfully 🎉");

      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Registration failed";

      setSuccess(false);
      setMessage(errorMsg);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-95 border border-gray-200">


        <h1 className="text-3xl font-semibold mb-2 text-center text-slate-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Register to start managing tasks
        </p>
        {message && (
          <div className={`mb-4 p-3 rounded text-white text-center
    ${success ? "bg-green-500" : "bg-red-500"}`}>
            {message}
          </div>
        )}


        <form onSubmit={submit} className="space-y-4">


          <input
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button className="w-full bg-indigo-500 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition">
            Create Account
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Already have an account?
          <span
            onClick={() => navigate("/")}
            className="text-indigo-500 cursor-pointer ml-1 font-semibold"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );

}
