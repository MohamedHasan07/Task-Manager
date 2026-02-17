import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../api/api";

export default function CompletedTasks(){
  const [tasks,setTasks]=useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  const loadTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // ⭐ Admin → all tasks | User → only own tasks
      const url = user.role === "admin" ? "/tasks" : "/tasks/my";

      const res = await API.get(url);

      // ⭐ filter only COMPLETED tasks
      const completedTasks = res.data.filter(
        (t) => t.status === "completed"
      );

      setTasks(completedTasks);

    } catch (err) {
      console.error("Failed to load completed tasks", err);
    }
  };

  loadTasks();
}, []);

const getDeadlineColor = (deadline) => {
  if (!deadline) return "text-gray-400";

  const now = new Date();
  const due = new Date(deadline);

  return now > due ? "text-red-600 font-bold" : "text-blue-600 font-semibold";
};



  return(
    <Layout>
      <h1 className="text-3xl mb-6">Completed Tasks</h1>

      <table className="min-w-full table-fixed bg-white rounded-xl overflow-hidden shadow-lg">

  <thead className="bg-slate-800 text-white">
    <tr>
      <th className="py-3 px-4 ">Title</th>
        <th className="py-3 px-4 w-125 ">Task</th>
      <th className="py-3 px-4">Status</th>
      <th className="py-3 px-4">Assigned At</th>
      <th className="py-3 px-4">Completed On</th>
    </tr>
  </thead>
  
  <tbody className="text-gray-700">
      {tasks.map(t=>(
        <tr key={t.id} className="bg-white p-4 shadow mb-2">
          <td className="text-center py-3 px-4">{t.title}</td>
            <td className="py-3 px-4 w-125 align-top">
    <p className="whitespace-pre-wrap wrap-break-word">
      *{t.description}
    </p>
  </td>
          <td className="text-center">{t.status}</td>
          <td className="text-center w-50">
            {new Date(t.created_at).toLocaleString("en-IN", {
             day: "2-digit",
              month: "2-digit",
             year: "numeric",
             hour: "2-digit",
            minute: "2-digit"
            })}
          </td>
          <td className="text-center w-50">
  {new Date(t.completed_at).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}
</td>



         </tr>
      ))}

     
      </tbody>
      </table>
    </Layout>
  );
}
