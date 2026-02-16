import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import API from "../../api/api";

export default function Users() {

  // ✅ ALL HOOKS MUST BE HERE
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = () => {
    API.get("/tasks/admin/users").then(res => setUsers(res.data));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // open modal
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // confirm delete
  const confirmDelete = async () => {
   await API.delete(`/users/${selectedUser.id}`);

    setShowDeleteModal(false);
    loadUsers();
  };

  return (
    <Layout>
      <h1 className="text-3xl mb-6">Users</h1>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b text-center">
                <td className="py-3">{u.id}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>{u.email}</td>
                <td>
                  <button
                    onClick={() => openDeleteModal(u)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CUSTOM DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-100 text-center">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              Delete User
            </h2>

            <p className="text-gray-600 mb-6">
              Delete <b>{selectedUser?.name}</b> ?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
              >
                Yes Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
}
