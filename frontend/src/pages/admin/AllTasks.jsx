import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";


export default function AllTasks() {
  const navigate = useNavigate();


  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: ""
  });

  const loadTasks = () => {
    API.get("/tasks").then(res => setTasks(res.data));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // START EDIT
  const startEdit = (task) => {
    setEditId(task.id);
    setEditData({
      title: task.title,
      description: task.description
    });
  };

  // SAVE EDIT
  const saveEdit = async (id) => {
    await API.put(`/tasks/${id}`, editData);
    setEditId(null);
    loadTasks();
  };

  // DELETE
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  // APPROVE (ADMIN)
  const approveTask = async (id) => {
    await API.patch(`/tasks/approve/${id}`);
    loadTasks();
  };

  const getDeadlineColor = (deadline) => {
    if (!deadline) return "text-gray-400";

    const now = new Date();
    const due = new Date(deadline);

    return now > due ? "text-red-600 font-bold" : "text-blue-600 font-semibold";
  };


  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-6">All Tasks</h1>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <table className="min-w-full table-fixed">

          {/* HEADER */}
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-4 w-[15%] text-left">Title</th>
              <th className="px-6 py-4 w-[30%] text-left">Task</th>
              <th className="px-6 py-4 w-[10%] text-center">User</th>
              <th className="px-6 py-4 w-[12%] text-center">Status</th>
              <th className="px-6 py-4 w-[18%] text-center">Deadline</th>
              <th className="px-6 py-4 w-[20%] text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y">

            {tasks.map((t) => (
              <tr key={t.id} className="align-top hover:bg-gray-50">

                {/* TITLE */}
                <td className="px-6 py-4 font-medium">
                  {editId === t.id ? (
                    <input
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="border p-1 w-full rounded"
                    />
                  ) : t.title}
                </td>

                {/* DESCRIPTION */}
                <td className="px-6 py-4">
                  {editId === t.id ? (
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="border p-1 w-full rounded"
                    />
                  ) : (
                    <p className="wrap-break-word text-gray-600 whitespace-pre-wrap">
                      {t.description}
                    </p>
                  )}
                </td>

                {/* USER NAME */}
                <td className="px-6 py-4 text-center font-semibold text-slate-700">
                  {t.name}
                </td>

                {/* STATUS BADGE */}
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-white text-sm
                    ${t.status === "pending" && "bg-red-500"}
                    ${t.status === "inreview" && "bg-yellow-500"}
                    ${t.status === "completed" && "bg-green-600"}
                  `}>
                    {t.status}
                  </span>
                </td>

                {/* DEADLINE */}
                <td className={`px-6 py-4 text-center ${getDeadlineColor(t.deadline)}`}>
                  {t.deadline
                    ? new Date(t.deadline).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                    : "—"}
                </td>


                {/* ACTIONS */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2 flex-wrap">

                    {/* PENDING → edit/delete */}
                    {t.status === "pending" && (
                      <>
                        {editId === t.id ? (
                          <button
                            onClick={() => saveEdit(t.id)}
                            className="bg-indigo-600 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => startEdit(t)}
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                        )}

                        <button
                          onClick={() => deleteTask(t.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {/* ⭐ IN REVIEW → Review Button */}
                    {t.status === "inreview" && (
                      <button
                        onClick={() => navigate(`/review/${t.id}`)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Review
                      </button>
                    )}


                  </div>
                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>
    </Layout>
  );
}
