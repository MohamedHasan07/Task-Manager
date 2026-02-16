import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [form,setForm] = useState({
    name:"", email:"", password:"", role:"user"
  });

  const [error,setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    setError("");

    // ===== FRONTEND VALIDATION =====
    if(!form.name.trim() || !form.email.trim() || !form.password.trim()){
      return setError("All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(form.email)){
      return setError("Invalid email format");
    }

    if(form.password.length < 4){
      return setError("Password must be at least 4 characters");
    }

    try{
      await API.post("/auth/register",form);
      alert("Registration successful");
      navigate("/");
    }catch(err){
      setError(err.response?.data?.message || err.response?.data);
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

    <form onSubmit={submit} className="space-y-4">


        <input
          placeholder="Full Name"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.password}
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button className="w-full bg-indigo-500 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition">
          Create Account
        </button>
      </form>

      <p className="text-center mt-5 text-gray-600">
        Already have an account?
        <span
          onClick={()=>navigate("/")}
          className="text-indigo-500 cursor-pointer ml-1 font-semibold"
        >
          Login
        </span>
      </p>

    </div>

  </div>
);

}
