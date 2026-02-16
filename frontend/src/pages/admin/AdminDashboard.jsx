import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import API from "../../api/api";
import StatCard from "../../components/StatCard";
import TaskChart from "../../components/TaskChart";

export default function AdminDashboard() {
  const [tasks,setTasks] = useState([]);
  const [stats,setStats] = useState({
    users:0,
    pending:0,
    completed:0
  });

 useEffect(() => {
  const loadDashboard = async () => {

    // get tasks
    const taskRes = await API.get("/tasks");
    setTasks(taskRes.data);

    // get users
    const userRes = await API.get("/tasks/admin/users");

    // calculate stats
    const totalUsers = userRes.data.length;
    const pending = taskRes.data.filter(t => t.status === "pending").length;
    const completed = taskRes.data.filter(t => t.status === "completed").length;

    setStats({
      users: totalUsers,
      pending,
      completed
    });
  };

  loadDashboard();
}, []);


  return (
    <Layout>
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard title="Users" value={stats.users} color="text-blue-500" />
        <StatCard title="Pending" value={stats.pending} color="text-red-500" />
        <StatCard title="Completed" value={stats.completed} color="text-green-500" />
      </div>

      {/* Pie chart */}
      <div className="flex justify-center"> <TaskChart pending={stats.pending} completed={stats.completed} /></div>
     

      {/* Recent Tasks Table (from your sketch) */}
      <h2 className="text-2xl mt-10 mb-4">Recent Tasks</h2>

      <table className="min-w-full table-fixed bg-white rounded-xl overflow-hidden shadow-lg">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-3">Title</th>
            <th className="py-3 px-4">Date & Time</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {tasks.slice(0, 5).map(task => (
            <tr key={task.id} className="">
              <td className="py-3 px-4 text-center">{task.title}</td>
              <td className=" py-3 px-4 text-center">{new Date(task.created_at).toLocaleString()}</td>
              <td className="py-3 px-4 text-center"><span className={`px-3 py-1 rounded-full text-white ${
                  task.status==="pending" ? "bg-red-500" : "bg-green-500"
                }`}>
                  {task.status}
                </span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
