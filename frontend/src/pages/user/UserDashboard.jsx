import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import API from "../../api/api";
import StatCard from "../../components/StatCard";
import TaskChart from "../../components/TaskChart";

export default function UserDashboard(){
  const [tasks,setTasks] = useState([]);
  const [stats,setStats] = useState({
    total:0,
    pending:0,
    completed:0
  });

useEffect(() => {
  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks/my");

      setTasks(res.data);

      const total = res.data.length;
      const pending = res.data.filter(t => t.status === "pending").length;
      const completed = res.data.filter(t => t.status === "completed").length;

      setStats({ total, pending, completed });
    } catch (err) {
      console.error("Failed to load user tasks", err);
    }
  };

  loadTasks();
}, []);


  return(
    <Layout>
      <h1 className="text-3xl mb-6">User Dashboard</h1>

      {/* Stats Cards */}
     
      <div className="grid grid-cols-3 gap-6 mb-8">
         <StatCard title="My Total Tasks"  value={stats.total} color="text-blue-500" />
        <StatCard title="My Pending Tasks" value={stats.pending} color="text-red-500"/>
        <StatCard title="My Completed Tasks" value={stats.completed} color="text-green-500"/>
      </div>

      {/* Chart */}
      <div className="flex justify-center"><TaskChart pending={stats.pending} completed={stats.completed}/></div>
      

      {/* Recent Tasks Table */}
      <h2 className="text-2xl mt-10 mb-4">My Recent Tasks</h2>

     <table className="min-w-full table-fixed bg-white rounded-xl overflow-hidden shadow-lg">

        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Date</th>
         
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {tasks.slice(0,5).map((t,i)=>(
            <tr key={t.id} className={i%2?"bg-gray-50":"bg-white"}>
              <td className="py-3 px-4">{t.title}</td>

              <td className="text-center">
                <span className={`px-3 py-1 rounded-full text-white ${
                  t.status==="pending" ? "bg-red-500" : "bg-green-500"
                }`}>
                  {t.status}
                </span>
              </td>

              <td className="text-center">
                {new Date(t.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
