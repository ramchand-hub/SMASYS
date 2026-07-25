import { useState } from "react";
import dayjs from "dayjs";
import Card from "../../common/Card";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CalendarCard = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");

  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const today = dayjs();

  const dates: (number | null)[] = [];

  // Empty cells before first day
  for (let i = 0; i < startDay; i++) {
    dates.push(null);
  }

  // Dates
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }

  return (
    <Card
      title="Calendar"
      headerRight={
        <button>
          <MoreHorizontal size={18} />
        </button>
      }
    >
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ChevronLeft size={18} />
        </button>

        <h3 className="font-semibold text-gray-800">
          {currentMonth.format("MMMM YYYY")}
        </h3>

        <button
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-400 mb-3">
        {weekDays.map((day) => (
          <div
            key={day}
            className="w-8 h-8 flex items-center justify-center mx-auto"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date, index) => {
          const isToday =
            date &&
            today.date() === date &&
            today.month() === currentMonth.month() &&
            today.year() === currentMonth.year();

          return (
            <div
              key={index}
              className={`
                h-10 w-10
                flex items-center justify-center
                rounded-xl
                text-sm
                cursor-pointer
                transition-all
                ${
                  date
                    ? "hover:bg-violet-100 text-gray-700"
                    : "pointer-events-none"
                }
                ${isToday ? "bg-violet-600 text-white font-semibold" : ""}
              `}
            >
              {date}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CalendarCard;