import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../api/api";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comment, setComment] = useState("");


  const loadTasks = () => API.get("/tasks/my").then(res => setTasks(res.data));

  useEffect(() => { loadTasks(); }, []);

  const openSubmitModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const submitReview = async () => {
    if (!comment.trim()) return;

    await API.patch(`/tasks/submit/${selectedTask.id}`, {
      comment
    });

    setShowModal(false);
    setComment("");
    loadTasks();
  };

  const getStatusColor = (status) => {
    if (status === "pending") return "bg-red-500";
    if (status === "inreview") return "bg-yellow-500";
    if (status === "completed") return "bg-green-500";
    return "bg-gray-500";
  };

  const getDeadlineColor = (deadline) => {
    if (!deadline) return "text-gray-400";

    const now = new Date();
    const due = new Date(deadline);

    return now > due ? "text-red-600 font-bold" : "text-blue-600 font-semibold";
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
            <th className="py-3 px-4">Deadline</th>

            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {tasks.map(t => (
            <tr key={t.id} className="bg-white p-4 shadow mb-2">
              <td className="py-3 px-4 text-left">{t.title}</td>
              <td className="px-6 py-4 text-center">
                <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(t.status)}`}>
                  {t.status}
                </span>
              </td>

              <td className="text-center">{new Date(t.created_at).toLocaleDateString()}</td>
              <td className="text-center">{new Date(t.created_at).toLocaleTimeString()}</td>
              <td className={`text-center ${getDeadlineColor(t.deadline)}`}>
                {t.deadline
                  ? new Date(t.deadline).toLocaleDateString()
                  : "—"}
              </td>


              <td className="text-center">
                {t.status === "pending" && (

                  <button
                    onClick={() => openSubmitModal(t)}

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

      {/* ===== SUBMIT WORK MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-2xl w-112.5 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800">
              Submit Task Work
            </h2>

            <p className="text-gray-500 mb-3">
              Write a message about the completed task
            </p>

            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="Type your message..."
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={submitReview}
                className="px-4 py-2 rounded bg-indigo-600 text-white"
              >
                Submit
              </button>
            </div>
          </div>

        </div>
      )}

    </Layout>
  );
}
