import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({children}){
  return(
    <div className="flex h-screen">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <Navbar/>
        <div className="p-6 bg-gray-100 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
