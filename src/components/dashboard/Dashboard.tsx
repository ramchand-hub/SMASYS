import {
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  UserPlus,
  ClipboardCheck,
  FileText,
} from "lucide-react";

const DashboardPage = () => {
  const stats = [
    {
      title: "Total Students",
      value: "248",
      icon: GraduationCap,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      title: "Total Teachers",
      value: "18",
      icon: Users,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    {
      title: "Total Classes",
      value: "12",
      icon: BookOpen,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      title: "Attendance Today",
      value: "92%",
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  const chartData = [
    { month: "Jan", value: 80 },
    { month: "Feb", value: 120 },
    { month: "Mar", value: 105 },
    { month: "Apr", value: 145 },
    { month: "May", value: 115 },
    { month: "Jun", value: 165 },
    { month: "Jul", value: 175 },
    { month: "Aug", value: 165 },
    { month: "Sep", value: 170 },
    { month: "Oct", value: 168 },
    { month: "Nov", value: 195 },
    { month: "Dec", value: 230 },
  ];

  const activities = [
    {
      title: "New student added",
      description: "Rohit Kumar - Class 6A",
      time: "2m ago",
      icon: UserPlus,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Teacher added",
      description: "Priya Sharma - Mathematics",
      time: "10m ago",
      icon: Users,
      bg: "bg-violet-100",
      color: "text-violet-600",
    },
    {
      title: "Attendance marked",
      description: "Class 5A - 92%",
      time: "30m ago",
      icon: ClipboardCheck,
      bg: "bg-orange-100",
      color: "text-orange-500",
    },
    {
      title: "Exam created",
      description: "Mid Term Exam - Grade 7",
      time: "1h ago",
      icon: FileText,
      bg: "bg-pink-100",
      color: "text-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7faff] p-5">

      {/* Welcome Section */}
      <div className="mb-5">
        <h1 className="text-lg font-bold text-slate-800">
          Good Morning, Admin 👋
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Here's what's happening at your school today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-slate-100
                bg-white
                p-4
                shadow-sm
              "
            >
              <div>
                <p className="text-[11px] font-medium text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-800">
                  {item.value}
                </h2>
              </div>

              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  ${item.iconBg}
                  ${item.iconColor}
                `}
              >
                <Icon size={18} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* Student Overview */}
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">

          <h2 className="mb-5 text-sm font-semibold text-slate-800">
            Student Overview
          </h2>

          <div className="flex">

            {/* Y Axis */}
            <div className="mr-3 flex h-52 flex-col justify-between text-[9px] text-slate-400">
              <span>250</span>
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            {/* Chart */}
            <div className="relative flex-1">

              {/* Horizontal Lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[1, 2, 3, 4, 5, 6].map((line) => (
                  <div
                    key={line}
                    className="border-t border-slate-100"
                  />
                ))}
              </div>

              {/* Bars */}
              <div className="relative flex h-52 items-end justify-between gap-2">
                {chartData.map((item, index) => (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <div
                      style={{
                        height: `${(item.value / 250) * 100}%`,
                      }}
                      className={`
                        w-full
                        max-w-[18px]
                        rounded-t-sm
                        ${
                          index === chartData.length - 1
                            ? "bg-blue-600"
                            : "bg-sky-400"
                        }
                      `}
                    />

                    <span className="mt-2 text-[8px] text-slate-400">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">

          <h2 className="mb-3 text-sm font-semibold text-slate-800">
            Recent Activities
          </h2>

          <div>
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-slate-50
                    py-3
                    last:border-0
                  "
                >
                  {/* Icon */}
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      ${activity.bg}
                      ${activity.color}
                    `}
                  >
                    <Icon size={16} />
                  </div>

                  {/* Activity */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-slate-700">
                      {activity.title}
                    </p>

                    <p className="mt-0.5 text-[9px] text-slate-400">
                      {activity.description}
                    </p>
                  </div>

                  {/* Time */}
                  <span className="shrink-0 text-[9px] text-slate-400">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;