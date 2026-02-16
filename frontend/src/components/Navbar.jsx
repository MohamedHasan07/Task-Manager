export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const date = new Date().toLocaleDateString("en-IN");
const time = new Date().toLocaleTimeString("en-IN");

  return (
    <div className="bg-slate-800 text-white p-4 flex justify-between">

      <div>
        <p>Date : {date}</p>
        <p>Time : {time}</p>
        </div>
        <div>
        <p className="font-bold">Name : {user?.name}</p>
        <p className="font-semibold">Role : {user?.role}</p>
      </div>

      <button onClick={logout} className="bg-red-500 px-3 rounded">
        Logout
      </button>
    </div>
  );
}
