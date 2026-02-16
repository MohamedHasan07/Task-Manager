import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PendingTasks from "./pages/admin/PendingTasks";
import CompletedTasks from "./pages/admin/CompletedTasks";
import ReviewTask from "./pages/admin/ReviewTask";


import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import AssignTask from "./pages/admin/AssignTask";
import AllTasks from "./pages/admin/AllTasks";

import UserDashboard from "./pages/user/UserDashboard";
import MyTasks from "./pages/user/MyTasks";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>

        {!user && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {user?.role === "admin" && (

          <>
          <Route path="/pending" element={<PendingTasks />} />
          <Route path="/completed" element={<CompletedTasks />} />
          <Route path="/review/:id" element={<ReviewTask/>}/>


            <Route path="/" element={<AdminDashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/assign" element={<AssignTask />} />
            <Route path="/all-tasks" element={<AllTasks />} />
          </>
        )}

        {user?.role === "user" && (
          <>
            <Route path="/pending" element={<PendingTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />

            <Route path="/" element={<UserDashboard />} />
            <Route path="/tasks" element={<MyTasks />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
