import { FaBars } from "react-icons/fa";

const Navbar = ({ setOpen }:any) => {

  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-6">

      <FaBars
        className="text-xl cursor-pointer md:hidden"
        onClick={() => setOpen(true)}
      />

      <h1 className="font-semibold text-xl">
        Student Management
      </h1>

      <div className="flex items-center gap-3">

        <img
          src="https://i.pravatar.cc/40"
          alt=""
          className="rounded-full"
        />

        <span className="font-medium">
          Admin
        </span>

      </div>

    </header>
  );
};

export default Navbar;