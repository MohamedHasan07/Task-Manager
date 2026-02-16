import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      console.log("LOGIN RESPONSE:", res.data);

      // ⭐ SAVE TOKEN + USER
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ⭐ REDIRECT BASED ON ROLE
      if (res.data.user.role === "admin") {
        navigate("/");
      } else {
        navigate("/");
      }

      // reload app to apply routes
      window.location.reload();

    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center">


   <div className="bg-white p-10 rounded-2xl shadow-2xl w-95 border border-gray-200">

      <h1 className="text-3xl font-semibold mb-6 text-center text-slate-800">
        Task Manager Login
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
  <input
    type="email"
    placeholder="Email"
    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
    value={form.email}
    onChange={(e)=>setForm({...form, email:e.target.value})}
  />

  <input
    type="password"
    placeholder="Password"
    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
    value={form.password}
    onChange={(e)=>setForm({...form, password:e.target.value})}
  />

  <button className="w-full bg-indigo-500 hover:bg-slate-800 text-white py-3 rounded font-semibold transition">
    Login
  </button>
</form>

    

      <p className="text-center mt-4 text-gray-600">
        No account?
        <span
          onClick={()=>navigate("/register")}
          className="text-indigo-500 cursor-pointer ml-1 font-semibold"
        >
          Register
        </span>
      </p>
    </div>
  </div>
);

}
