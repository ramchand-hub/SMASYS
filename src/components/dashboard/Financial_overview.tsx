import React from "react";
import Card from "../../common/Card";
import { FiTrendingUp } from "react-icons/fi";

const financialData = [
  {
    id: 1,
    title: "Total Income",
    amount: "₹29,545,000",
    growth: "12%",
  },
  {
    id: 2,
    title: "Total Expenses",
    amount: "₹19,291,266",
    growth: "0.5%",
  },
];

const Financial_overview = () => {
  return (
    <Card
      title="Financial Overview"
      headerRight={
        <div className="flex gap-2">
          <select className="px-3 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 text-gray-600 outline-none">
            <option>2023-2024</option>
            <option>2022-2023</option>
          </select>

          <select className="px-3 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 text-gray-600 outline-none">
            <option>Annual</option>
            <option>Monthly</option>
            <option>Weekly</option>
          </select>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {financialData.map((item) => (
          <div
            key={item.id}
            className="relative rounded-2xl bg-sky-100 p-5 overflow-hidden"
          >
            {/* Decorative Graph */}
            <svg
              className="absolute top-4 left-5 opacity-60"
              width="60"
              height="25"
              viewBox="0 0 60 25"
              fill="none"
            >
              <path
                d="M2 10 C8 2,14 20,20 12 S32 4,38 14 S50 20,58 5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Growth Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-green-600 shadow-sm">
              <FiTrendingUp size={12} />
              {item.growth}
            </div>

            {/* Content */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                {item.amount}
              </h2>

              <p className="mt-1 text-xl text-gray-800">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Financial_overview;