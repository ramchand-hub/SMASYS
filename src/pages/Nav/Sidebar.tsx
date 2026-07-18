import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaCog,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ open, setOpen }:any) => {

  return (
    <>
      <div
        className={`fixed md:static z-50 h-full w-64 bg-slate-900 text-white transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-700">

          <h2 className="text-xl font-bold">
            Admin Panel
          </h2>

          <FaTimes
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(false)}
          />

        </div>

        <nav className="mt-5 flex flex-col">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 hover:bg-blue-600 ${
                isActive ? "bg-blue-600" : ""
              }`
            }
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/students"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 hover:bg-blue-600 ${
                isActive ? "bg-blue-600" : ""
              }`
            }
          >
            <FaUserGraduate />
            Students
          </NavLink>

          <NavLink
            to="/Teachers"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 hover:bg-blue-600 ${
                isActive ? "bg-blue-600" : ""
              }`
            }
          >
            <FaCog />
            Teachers
          </NavLink>

        </nav>

      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;