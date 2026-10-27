import { useMemo, useState } from "react";
import {
    CalendarDays,
    Search,
    Users,
    CheckCircle2,
    XCircle,
    Clock3,
    Save,
    ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
type AttendanceStatus = "present" | "absent" | "leave" | null;

interface Student {
    _id: string;
    rollno: string;
    first_name: string;
    last_name: string;
    status: AttendanceStatus;
    remarks: string;
}

const initialStudents: Student[] = [
    { _id: "1", rollno: "1001", first_name: "Arun", last_name: "Sharma", status: "present", remarks: "" },
    { _id: "2", rollno: "1002", first_name: "Diya", last_name: "Patel", status: "present", remarks: "" },
    { _id: "3", rollno: "1003", first_name: "Rohan", last_name: "Mehta", status: "absent", remarks: "Sick" },
    { _id: "4", rollno: "1004", first_name: "Sneha", last_name: "Gupta", status: "present", remarks: "" },
    { _id: "5", rollno: "1005", first_name: "Kartik", last_name: "Singh", status: "present", remarks: "" },
    { _id: "6", rollno: "1006", first_name: "Ananya", last_name: "Verma", status: "present", remarks: "" },
    { _id: "7", rollno: "1007", first_name: "Vikram", last_name: "Rao", status: "present", remarks: "" },
    { _id: "8", rollno: "1008", first_name: "Pooja", last_name: "Iyer", status: null, remarks: "" },
];

const getToday = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().split("T")[0];
};

const CreateAttendance = () => {
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedDate, setSelectedDate] = useState(getToday());
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate()

    const pageSize = 8;

    const filteredStudents = useMemo(() => {
        const query = search.toLowerCase().trim();

        return students.filter((student) =>
            `${student.rollno} ${student.first_name} ${student.last_name}`
                .toLowerCase()
                .includes(query)
        );
    }, [students, search]);

    const totalPages = Math.ceil(filteredStudents.length / pageSize);

    const paginatedStudents = filteredStudents.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const presentCount = students.filter((s) => s.status === "present").length;
    const absentCount = students.filter((s) => s.status === "absent").length;
    const leaveCount = students.filter((s) => s.status === "leave").length;
    const notMarkedCount = students.filter((s) => s.status === null).length;

    const updateStatus = (id: string, status: AttendanceStatus) => {
        setStudents((prev) =>
            prev.map((student) =>
                student._id === id ? { ...student, status } : student
            )
        );
    };

    const updateRemarks = (id: string, remarks: string) => {
        setStudents((prev) =>
            prev.map((student) =>
                student._id === id ? { ...student, remarks } : student
            )
        );
    };

    const markAll = (status: AttendanceStatus) => {
        setStudents((prev) =>
            prev.map((student) => ({ ...student, status }))
        );
    };

    const toggleStudent = (id: string) => {
        setSelectedStudents((prev) =>
            prev.includes(id)
                ? prev.filter((studentId) => studentId !== id)
                : [...prev, id]
        );
    };

    const toggleAllVisible = () => {
        const visibleIds = paginatedStudents.map((student) => student._id);
        const allSelected = visibleIds.every((id) => selectedStudents.includes(id));

        setSelectedStudents((prev) =>
            allSelected
                ? prev.filter((id) => !visibleIds.includes(id))
                : [...new Set([...prev, ...visibleIds])]
        );
    };

    const handleSave = () => {
        if (!selectedClass || !selectedSection || !selectedDate) {
            alert("Please select class, section and date.");
            return;
        }

        if (notMarkedCount > 0) {
            alert("Please mark attendance for all students.");
            return;
        }

        const payload = {
            class: selectedClass,
            section: selectedSection,
            date: selectedDate,
            attendance: students.map((student) => ({
                student_id: student._id,
                status: student.status,
                remarks: student.remarks,
            })),
        };

        console.log("Attendance Payload:", payload);

        // Call your attendance API here.
    };

    const summaryCards = [
        {
            label: "Total Students",
            count: students.length,
            icon: Users,
            bg: "bg-blue-50",
            color: "text-blue-600",
            iconBg: "bg-blue-100",
        },
        {
            label: "Present",
            count: presentCount,
            icon: CheckCircle2,
            bg: "bg-emerald-50",
            color: "text-emerald-600",
            iconBg: "bg-emerald-100",
        },
        {
            label: "Absent",
            count: absentCount,
            icon: XCircle,
            bg: "bg-red-50",
            color: "text-red-600",
            iconBg: "bg-red-100",
        },
        {
            label: "Not Marked",
            count: notMarkedCount,
            icon: Clock3,
            bg: "bg-amber-50",
            color: "text-amber-600",
            iconBg: "bg-amber-100",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6">
            {/* Page Header */}
            <div className="mb-5">
                <div className="flex items-center gap-3">
                    <CalendarDays size={28} className="text-blue-600" />

                    <div>
                        <h1 className="text-xl font-bold text-slate-900">
                            Mark Attendance
                        </h1>
                        <p className="mt-1 text-xs text-slate-500">
                            Dashboard / Attendance / Mark Attendance
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-4 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-4">
                <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-700">
                        Class
                    </label>

                    <div className="relative">
                        <select
                            value={selectedClass}
                            onChange={(e) => {
                                setSelectedClass(e.target.value);
                                setSelectedSection("");
                            }}
                            className="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-xs text-slate-600 outline-none focus:border-blue-500"
                        >
                            <option value="">Select Class</option>
                            <option value="8">8th Grade</option>
                            <option value="9">9th Grade</option>
                            <option value="10">10th Grade</option>
                        </select>

                        <ChevronDown
                            size={15}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-700">
                        Section
                    </label>

                    <div className="relative">
                        <select
                            value={selectedSection}
                            onChange={(e) => setSelectedSection(e.target.value)}
                            className="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-9 text-xs text-slate-600 outline-none focus:border-blue-500"
                        >
                            <option value="">Select Section</option>
                            <option value="a">Section A</option>
                            <option value="b">Section B</option>
                            <option value="c">Section C</option>
                        </select>

                        <ChevronDown
                            size={15}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-700">
                        Date
                    </label>

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex items-end">
                    <button
                        type="button"
                        className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-xs font-semibold text-white transition hover:bg-blue-700"
                    >
                        <Search size={16} />
                        Load Students
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.label}
                            className={`flex items-center gap-4 rounded-xl border border-slate-100 p-5 shadow-sm ${card.bg}`}
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-full ${card.iconBg}`}
                            >
                                <Icon size={24} className={card.color} />
                            </div>

                            <div>
                                <p className="text-xs font-medium text-slate-600">
                                    {card.label}
                                </p>
                                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                    {card.count}
                                </h2>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Attendance Table */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
                <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                    <div className="relative w-full lg:max-w-md">
                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search by roll number or student name..."
                            className="h-10 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-xs outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => markAll("present")}
                            className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                        >
                            <CheckCircle2 size={16} />
                            Mark All Present
                        </button>

                        <button
                            type="button"
                            onClick={() => markAll("absent")}
                            className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-100"
                        >
                            <XCircle size={16} />
                            Mark All Absent
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] border-collapse text-left">
                        <thead>
                            <tr className="border border-slate-200 bg-blue-50 text-xs font-semibold text-slate-800">
                                <th className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={
                                            paginatedStudents.length > 0 &&
                                            paginatedStudents.every((student) =>
                                                selectedStudents.includes(student._id)
                                            )
                                        }
                                        onChange={toggleAllVisible}
                                        className="checkbox checkbox-primary checkbox-xs"
                                    />
                                </th>
                                <th className="px-4 py-3">Roll No.</th>
                                <th className="px-4 py-3">Student Name</th>
                                <th className="px-4 py-3">Attendance Status</th>
                                <th className="px-4 py-3">Remarks (Optional)</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedStudents.map((student) => (
                                <tr
                                    key={student._id}
                                    className="border-b border-slate-100 text-xs text-slate-700 hover:bg-slate-50"
                                >
                                    <td className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.includes(student._id)}
                                            onChange={() => toggleStudent(student._id)}
                                            className="checkbox checkbox-primary checkbox-xs"
                                        />
                                    </td>

                                    <td className="px-4 py-3 font-medium">
                                        {student.rollno}
                                    </td>

                                    <td className="px-4 py-3">
                                        {student.first_name} {student.last_name}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-5">
                                            {(
                                                [
                                                    ["present", "Present", "accent-emerald-600", "text-emerald-600"],
                                                    ["absent", "Absent", "accent-red-500", "text-red-500"],
                                                    ["leave", "Leave", "accent-amber-500", "text-amber-600"],
                                                ] as const
                                            ).map(([value, label, inputColor, textColor]) => (
                                                <label
                                                    key={value}
                                                    className={`flex cursor-pointer items-center gap-1.5 ${textColor}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`attendance-${student._id}`}
                                                        checked={student.status === value}
                                                        onChange={() => updateStatus(student._id, value)}
                                                        className={`h-4 w-4 ${inputColor}`}
                                                    />
                                                    {label}
                                                </label>
                                            ))}
                                        </div>
                                    </td>

                                    <td className="px-4 py-3">
                                        <input
                                            type="text"
                                            value={student.remarks}
                                            onChange={(e) =>
                                                updateRemarks(student._id, e.target.value)
                                            }
                                            placeholder="Enter remarks..."
                                            className="h-9 w-full min-w-[180px] rounded-md border border-slate-200 px-3 text-xs outline-none focus:border-blue-500"
                                        />
                                    </td>
                                </tr>
                            ))}

                            {paginatedStudents.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-10 text-center text-sm text-slate-500"
                                    >
                                        No students found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <p className="text-xs text-slate-500">
                        Showing{" "}
                        {filteredStudents.length === 0
                            ? 0
                            : (page - 1) * pageSize + 1}{" "}
                        to {Math.min(page * pageSize, filteredStudents.length)} of{" "}
                        {filteredStudents.length} students
                    </p>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                            className="rounded-md border border-slate-200 px-3 py-2 text-xs disabled:opacity-40"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                type="button"
                                key={index}
                                onClick={() => setPage(index + 1)}
                                className={`rounded-md px-3 py-2 text-xs ${page === index + 1
                                        ? "bg-blue-600 text-white"
                                        : "border border-slate-200 text-slate-600"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            type="button"
                            disabled={page >= totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="rounded-md border border-slate-200 px-3 py-2 text-xs disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    onClick={() => navigate("/attendance")}
                    className="rounded-md border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    <Save size={17} />
                    Save Attendance
                </button>
            </div>
        </div>
    );
};

export default CreateAttendance;