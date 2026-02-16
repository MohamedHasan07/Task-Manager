import { Link } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-60 bg-slate-900 text-white min-h-screen p-5">
      <h2 className="text-2xl mb-6 font-bold">Task Manager</h2>

      <nav className="flex flex-col gap-3">

        <Link to="/">Dashboard</Link>

        {user?.role === "admin" && (
          <>
            <Link to="/users">Users</Link>
            <Link to="/assign">Assign Task</Link>
            <Link to="/all-tasks">All Tasks</Link>
            <Link to="/pending">Pending</Link>
            <Link to="/completed">Completed</Link>
          </>
        )}

        {user?.role === "user" && (
          <>
            <Link to="/tasks">My Tasks</Link>
            <Link to="/pending">Pending</Link>
            <Link to="/completed">Completed</Link>
          </>
        )}

      </nav>
    </div>
  );
}
