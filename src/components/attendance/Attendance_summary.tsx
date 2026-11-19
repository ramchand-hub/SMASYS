import { useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import { Plus, ChevronDown } from "lucide-react";
import { attendanceList } from "../../Services/Allservice";
import Pagination from "../../common/Pagination";
import useclass from "../../custom_hooks/Useclass";
import Toaster from "../../common/toaster";

type ToastType = "success" | "error" | "warning" | "info";

const AttendanceList = () => {
    const navigate = useNavigate();
    const { classes } = useclass()
    const [selectedClass, setSelectedClass] = useState("");
    const [page, setPage] = useState(1)
    const pagesize = 10
    const [Totalpages, setTotalPages] = useState<any>()
    const [attendancecount, setAttendancecount] = useState()
    const [attendancelist, setAttendancelist] = useState<any[]>([])
    const [toast_message, setToastmessage] = useState("")
    const [toast_type, setToasttype] = useState<ToastType>("success")
    const [showtoast, setShowtoast] = useState(false)

    const getToday = () => {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = now.getFullYear();

        return `${year}-${month}-${day}`;
    };

    const formatDate = (date: string) => {
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    };
    const handleClassChange = (value: string) => {
        setSelectedClass(value);
        setPage(1);
    };

    const handleDateChange = (value: string) => {
        setSelectedDate(value);
        setPage(1);
    };

    const [selectedDate, setSelectedDate] = useState(getToday());

    useEffect(() => {
        const fetchtimetablelist = async () => {
            try {
                const response = await attendanceList({
                    page: page,
                    pagesize: pagesize,
                    class_id: selectedClass,
                    require_date: selectedDate ? formatDate(selectedDate) : ""
                });

                if (response?.success === true) {
                    setAttendancelist(
                        response?.data?.attendance_list || []
                    );

                    setTotalPages(
                        response?.data?.pagination?.totalpages || 0
                    );

                    setAttendancecount(
                        response?.data?.pagination?.attendance_list_count || 0
                    );
                } else {
                    setAttendancelist([]);
                    setTotalPages(0);
                    // setAttendancecount(0);

                    setToastmessage(
                        response?.message || "Unable to fetch attendance"
                    );

                    setToasttype("error");
                    setShowtoast(true);
                }
            } catch (error) {
                console.log(error);

                setAttendancelist([]);
                setToastmessage("Something went wrong");
                setToasttype("error");
                setShowtoast(true);
            }
        };

        fetchtimetablelist();

    }, [page, selectedClass, selectedDate]);

    const handlenext = () => {
        if (page < Totalpages) {
            setPage(page + 1);
        }
    };

    const handleprevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
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
                                onChange={(e) => handleDateChange(e.target.value)}
                                className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-600 outline-none focus:border-blue-500"
                            />
                            <ChevronDown
                                size={14}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Attendance */}
                <div className="overflow-x-auto p-3">
                    <table className="w-full min-w-[850px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-200 bg-sky-50">
                                <th className="px-3 py-3 text-[10px] font-semibold text-slate-700">
                                    S.NO
                                </th>
                                <th className="px-3 py-3 text-[10px] font-semibold text-slate-700">
                                    Student Name
                                </th>
                                <th className="px-3 py-3 text-[10px] font-semibold text-slate-700">
                                    Roll No
                                </th>
                                <th className="px-3 py-3 text-[10px] font-semibold text-slate-700">
                                    Class
                                </th>
                                <th className="px-3 py-3 text-[10px] font-semibold text-slate-700">
                                    Date
                                </th>
                                <th className="px-3 py-3 text-[10px] font-semibold text-slate-700">
                                    Status
                                </th>

                            </tr>
                        </thead>


                        <tbody>
                            {attendancelist?.length > 0 ? (
                                attendancelist.map((attend: any, index: number) => (
                                    <tr
                                        key={attend.student_id}
                                        className="border-b border-slate-100 hover:bg-slate-50"
                                    >
                                        {/* S.NO */}
                                        <td className="px-4 py-3 text-xs text-slate-600">
                                            {(page - 1) * pagesize + index + 1}
                                        </td>

                                        {/* Student Name */}
                                        <td className="px-4 py-3 text-xs text-slate-600">
                                            {attend.student_name}
                                        </td>

                                        {/* Roll No */}
                                        <td className="px-4 py-3 text-xs text-slate-600">
                                            {attend.rollno}
                                        </td>

                                        {/* Class */}
                                        <td className="px-4 py-3 text-xs text-slate-600">
                                            {attend.class_name}
                                        </td>

                                        {/* Date */}
                                        <td className="px-4 py-3 text-xs text-slate-600">
                                            {attend.date}
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-3">
                                            <span
                                                className={`badge badge-sm ${attend.status === "present"
                                                        ? "badge-success"
                                                        : "badge-error"
                                                    }`}
                                            >
                                                {attend.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-8 text-center text-xs text-slate-400"
                                    >
                                        No attendance records found.
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
                {
                    showtoast && (
                        <Toaster

                            toast_message={toast_message}
                            type={toast_type}
                            onClose={() => setShowtoast(false)}

                        />
                    )
                }

            </div>
        </div>
    );
};

export default AttendanceList;
