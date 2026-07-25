import Card from "../../common/Card";

const feeStatus = [
  {
    count: "1,335",
    status: "Paid",
    color: "bg-green-100 text-green-600",
  },
  {
    count: "4,366",
    status: "Pending",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    count: "208",
    status: "Overdue",
    color: "bg-red-100 text-red-600",
  },
];

export default function FeeStatusCard() {
  return (
    <Card
      title="Fee Status"
      headerRight={
        <button className="text-gray-500 text-xl font-bold">•••</button>
      }
    >
      <div className="space-y-4">
        {feeStatus.map((item) => (
          <div
            key={item.status}
            className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
          >
            <span className="text-3xl font-bold text-gray-900">
              {item.count}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${item.color}`}
            >
              {item.status}
            </span>
          </div>
        ))}

        <div className="pt-2">
          <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none">
            <option>Annual</option>
            <option>Monthly</option>
            <option>Weekly</option>
          </select>
        </div>
      </div>
    </Card>
  );
}