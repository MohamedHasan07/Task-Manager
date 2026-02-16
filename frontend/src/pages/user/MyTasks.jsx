import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../api/api";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = () => API.get("/tasks/my").then(res => setTasks(res.data));

  useEffect(() => { loadTasks(); }, []);

  const submitWork = async (id) => {
    const comment = prompt("Enter message about completed work:");
    if (!comment) return;

    await API.patch(`/tasks/submit/${id}`, { comment });
    fetchTasks();
  };


  return (
    <Layout>
      <h1 className="text-3xl mb-6">My Tasks</h1>

      <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-lg">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Time</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {tasks.map(t => (
            <tr key={t.id} className="bg-white p-4 shadow mb-2">
              <td className="py-3 px-4 text-left">{t.title}</td>
              <td className="text-center">
                <span className={`px-3 py-1 rounded-full text-white ${t.status === "pending" ? "bg-red-500" : "bg-green-500"
                  }`}>
                  {t.status}
                </span>
              </td>
              <td className="text-center">{new Date(t.created_at).toLocaleDateString()}</td>
              <td className="text-center">{new Date(t.created_at).toLocaleTimeString()}</td>

              <td className="text-center">
                {t.status === "pending" && (

                  <button
                    onClick={() => submitWork(t.id)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded"
                  >
                    Submit Work
                  </button>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
