import React from "react";
import add_icon from "../assets/icons/plus.png";

interface AddProps {
  title?: string;
  onClick?: () => void;
}

const Add: React.FC<AddProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg bg-white px-4 py-2 shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-200"
    >
      <span className="text-sm font-medium text-gray-800">{title}</span>

      <div className="flex h-7 w-7 items-center justify-center rounded-md">
        <img src={add_icon} alt="Add" className="h-4 w-4 object-contain" />
      </div>
    </button>
  );
};

export default Add;
