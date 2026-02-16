import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../api/api";

export default function AssignTask() {

  const [users, setUsers] = useState([]);
 const [form,setForm]=useState({
  title:"",
  description:"",
  assigned_to:"",
  deadline:""
});


  // load users
  useEffect(() => {
    API.get("/tasks/admin/users").then(res => setUsers(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/tasks/admin/assign", form);
    alert("Task Assigned!");
    setForm({ title: "", description: "", assigned_to: "" });
  };

  // ⭐ JSX MUST be inside component
  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-8">Assign Task</h1>

      <div className="flex justify-center">
        <div className=" bg-slate-800 text-white w-130 p-8 rounded-2xl shadow-xl border">

          <h2 className="text-xl font-semibold mb-6 bg-slate-800 text-white">
            Create New Task
          </h2>

          <form onSubmit={submit} className="space-y-5">

            {/* TITLE */}
            <div>
              <label className="text-sm text-white">Task Title</label>
              <input
                required
                value={form.title}
                onChange={e=>setForm({...form,title:e.target.value})}
                className=" text-black bg-white w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter task title"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm text-white">Task Description</label>
              <textarea
                required
                rows="4"
                value={form.description}
                onChange={e=>setForm({...form,description:e.target.value})}
                className="text-black bg-white w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Enter task details..."
              />
            </div>

            {/* USER */}
            <div>
              <label className="text-sm text-white ">Assign To</label>
              <select
                required
                value={form.assigned_to}
                onChange={e=>setForm({...form,assigned_to:e.target.value})}
                className=" text-black bg-white w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              >
                <option value="">Select User</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>

            <div>
  <label className="text-sm text-gray-600">Deadline</label>
  <input
    type="datetime-local"
    required
    value={form.deadline}
    onChange={e=>setForm({...form,deadline:e.target.value})}
    className="w-full mt-1 p-3 border rounded-lg"
  />
</div>


            <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition">
              Assign Task
            </button>

          </form>
        </div>
      </div>

    </Layout>
  );
}
