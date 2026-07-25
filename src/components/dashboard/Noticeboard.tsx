import Card from "../../common/Card";
import {
  FiBell,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const notices = [
  {
    id: 1,
    title: "Sports Day Announcement",
    description:
      "The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars!",
    bg: "bg-yellow-100",
    icon: "text-yellow-500",
  },
  {
    id: 2,
    title: "Summer Break Start Date",
    description:
      "Summer break begins on May 25, 2024. Have a wonderful holiday!",
    bg: "bg-indigo-100",
    icon: "text-indigo-500",
  },
];

export default function Noticeboard() {
  return (
    <Card
      title="Notice Board"
      headerRight={
        <button className="text-sm text-gray-500 hover:text-violet-600 transition">
          View All
        </button>
      }
    >
      <div className="space-y-4">
        {/* Notice List */}
        <div className="max-h-52 overflow-y-auto pr-2 space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="flex items-start gap-4 border rounded-2xl p-3 bg-white"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${notice.bg}`}
              >
                <FiBell className={`text-2xl ${notice.icon}`} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {notice.title}
                </h3>
                <p className="text-sm text-gray-500 leading-5 mt-1">
                  {notice.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button className="px-5 py-2 rounded-lg bg-gray-100 text-gray-500 text-sm hover:bg-gray-200">
            Add New
          </button>

          <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200">
            <FiEdit2 className="text-gray-600" />
          </button>

          <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200">
            <FiTrash2 className="text-gray-600" />
          </button>
        </div>
      </div>
    </Card>
  );
}