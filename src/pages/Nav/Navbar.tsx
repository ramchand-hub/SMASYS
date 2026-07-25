import { FaBars } from "react-icons/fa";
import { useAuth } from "../../custom_hooks/Useauth";
import { useEffect } from "react";

const Navbar = ({ setOpen }: any) => {
  const { user_details } = useAuth();

  useEffect(() => {
    console.log(user_details, "userdetails...");
  }, [user_details]);
  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-6">
      <FaBars
        className="text-xl cursor-pointer md:hidden"
        onClick={() => setOpen(true)}
      />

      <h1 className="font-semibold text-xl">School Management System</h1>

      <div className="flex items-center gap-3">
        <img src="https://i.pravatar.cc/40" alt="" className="rounded-full" />

        <span className="font-medium">{user_details?.userdata}</span>
      </div>
    </header>
  );
};

export default Navbar;
