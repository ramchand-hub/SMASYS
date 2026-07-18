import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }:any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-col flex-1">

        <Navbar setOpen={setOpen} />

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;