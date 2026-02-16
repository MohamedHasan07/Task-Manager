import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import API from "../../api/api";

export default function ReviewTask() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
        API.get(`/tasks`).then(res => {
            const found = res.data.find(t => t.id == id);
            setTask(found);
        });
    }, []);

    // APPROVE → completed
    const approveTask = async () => {
        await API.patch(`/tasks/approve/${id}`);
        navigate("/all-tasks");
    };

    // 🔁 SEND BACK → pending (rework)
    const sendBack = async () => {
        await API.patch(`/tasks/rework/${id}`);
        navigate("/all-tasks");
    };

    // 🗑 DELETE task
    const deleteTask = async () => {
        if (!window.confirm("Delete this task?")) return;
        await API.delete(`/tasks/${id}`);
        navigate("/all-tasks");
    };


    if (!task) return <Layout>Loading...</Layout>;

    return (
        <Layout>
            <h1 className="text-3xl mb-6">Review Task</h1>

            <div className="bg-white p-8 rounded-2xl shadow-xl space-y-4">

                <p><b>Title:</b> {task.title}</p>
                <p><b>Description:</b> {task.description}</p>
                <p><b>User:</b> {task.name}</p>
                <p><b>User Message:</b> {task.comment || "No message"}</p>

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={approveTask}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                    >
                        Approve & Complete
                    </button>

                    {/* 🔁 REWORK */}
                    <button
                        onClick={sendBack}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
                    >
                        Send Back (Rework)
                    </button>

                    {/* 🗑 DELETE */}
                    <button
                        onClick={deleteTask}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                    >
                        Delete Task
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-800 text-white px-6 py-2 rounded-lg"
                    >
                        Back
                    </button>
                </div>

            </div>
        </Layout>
    );
}
