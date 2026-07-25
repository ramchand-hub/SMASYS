import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  bgColor: string;
  icon?: React.ReactNode;
  iconBg?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  bgColor,
  icon,
  iconBg = "bg-white",
}) => {
  return (
  <div className={`rounded-3xl p-5 shadow-sm ${bgColor}`}>
  <div className="flex justify-between items-start">
    <div>
      <p className="text-gray-700 text-lg">{title}</p>
      <h2 className="text-5xl font-bold mt-2">{value}</h2>
    </div>

    <button className="text-gray-600 text-xl font-bold">
      •••
    </button>
  </div>
</div>
  );
};

export default StatsCard;