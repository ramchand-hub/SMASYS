import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronDown } from "lucide-react";
import { timetableList } from "../../Services/Allservice";
import Pagination from "../../common/Pagination";
import useclass from "../../custom_hooks/Useclass";
type Day =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday";

interface ClassOption {
    _id: string;
    class_name: string;
    section: string;
}


const days: Day[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];

const formatTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    return `${String(formattedHour).padStart(2, "0")}:${String(
        minute
    ).padStart(2, "0")} ${period}`;
};


const AttendanceList = () => {
    const navigate = useNavigate();
    const { classes } = useclass()
    const [selectedClass, setSelectedClass] = useState("");
    const [page, setPage] = useState(1)
    const pagesize = 10
    const [Totalpages, setTotalPages] = useState<any>()
    const [attendancecount, setAttendancecount] = useState()
    const [attendancelist, setAttendancelist] = useState<any[]>([])
    const [selectedDate, setSelectedDate] = useState(
        new Date().toLocaleDateString("en-CA")
    );
    useEffect(() => {
        const fetchtimetablelist = async () => {
            const response = await timetableList({
                page: 1,
                pagesize: 10,
                ...(selectedClass && { class_id: selectedClass }),
            });

            if (response) {
                setAttendancelist(response?.data?.timetable_list);
                setTotalPages(response?.data?.pagination?.totalpages);
                setAttendancecount(response?.data?.pagination?.timetablecount);
            }
        };

        fetchtimetablelist();
    }, [selectedClass]);

    const handlenext = () => {

        setPage(page + 1)
    }

    const handleprevious = () => {
        if (page > 1) {
            setPage(page - 1)
        }

    }



    const getSubject = (
        day: Day,
        from: string,
        to: string
    ) => {
        const timetable = attendancelist.find(
            (item: any) => item.day === day
        );
        const period = timetable?.schedule.find(
            (item: any) => item.time_from === from && item.time_to === to
        );

        return period?.subject ?? "NA";
    };

    const handleClassChange = (value: string) => {

        setSelectedClass(() => value)
    };

    return (
        <div className="w-full">

            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <h1 className="text-[18px] font-semibold text-slate-800">
                        Attendance
                    </h1>

                    <div className="mt-1 flex items-center gap-1 text-[9px]">
                        <span className="text-slate-400">Dashboard</span>
                        <span className="text-slate-300">/</span>
                        <span className="text-blue-500">Attendance</span>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/attendance-add")}
                    className="flex h-7 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[10px] font-medium text-white transition hover:bg-blue-700"
                >
                    <Plus size={12} />
                    Mark Attendance
                </button>
            </div>

            {/* Timetable Card */}
            <div className="w-full overflow-hidden rounded-md border border-slate-200 bg-white">

                {/* Filters */}
                <div className="grid grid-cols-1 gap-4 border-b border-slate-100 p-4 md:grid-cols-2">

                    {/* Class */}
                    <div>
                        <label className="mb-2 block text-[11px] font-semibold text-slate-700">
                            Class
                        </label>

                        <div className="relative">
                            <select
                                value={selectedClass}
                                onChange={(e) =>
                                    handleClassChange(e.target.value)
                                }
                                className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-[11px] text-slate-600 outline-none focus:border-blue-500"
                            >
                                <option value="">Select Class</option>

                                {classes.map((item: any) => (
                                    <option key={item._id} value={item._id}>
                                        {item?.class_name} - {item?.section.toUpperCase()}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Section */}
                    <div>
                        <label className="mb-2 block text-[11px] font-semibold text-slate-700">
                            Date
                        </label>

                        <div className="relative">
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-600 outline-none focus:border-blue-500"
                            />
                            <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Weekly Timetable */}
                <div className="overflow-x-auto p-3">
                    <table className="w-full min-w-[850px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-sky-50">
                                <th className="px-3 py-3 text-[10px] font-semibold text-slate-700">
                                    Time
                                </th>

                                {days.map((day) => (
                                    <th
                                        key={day}
                                        className="px-3 py-3 text-[10px] font-semibold capitalize text-slate-700"
                                    >
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {attendancelist.length > 0 ? (
                                attendancelist.map((slot: any) =>
                                    slot.schedule.map((slotted: any) => (
                                        <tr
                                            key={slotted._id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-blue-50/30"
                                        >
                                            <td className="whitespace-nowrap px-3 py-3 text-[10px] font-medium text-blue-500">
                                                {formatTime(slotted.time_from)} - {formatTime(slotted.time_to)}
                                            </td>

                                            {days.map((day) => (
                                                <td
                                                    key={day}
                                                    className="px-3 py-3 text-[10px] text-blue-500"
                                                >
                                                    {getSubject(day, slotted.time_from, slotted.time_to)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-xs text-slate-400">
                                        No timetable found for this class and section
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    page={page}
                    pagesize={pagesize}
                    totalpages={Totalpages}
                    count={attendancecount}
                    next={handlenext}
                    previous={handleprevious}
                />

            </div>
        </div>
    );
};

export default AttendanceList;
