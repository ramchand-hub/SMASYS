
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import useclass from "../../custom_hooks/Useclass";
import { create_timetable } from "../../Services/Allservice";
type ScheduleRow = {
    id: number;
    time_from: string;
    time_to: string;
    subject: string;
};



const subjectOptions = [
    "Mathematics",
    "English",
    "Science",
    "Computer",
    "Social Science",
    "Hindi",
];

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const AddTimetable = () => {
    const navigate = useNavigate();
    const { classes } = useclass()
    const [formData, setFormData] = useState({
        class_id: "",
        day: "",
    });

    const [schedule, setSchedule] = useState<ScheduleRow[]>([
        {
            id: 1,
            time_from: "",
            time_to: "",
            subject: "",
        },
    ]);

    const [nextId, setNextId] = useState(2);
    const [error, setError] = useState("");


    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateSchedule = (
        id: number,
        field: keyof Omit<ScheduleRow, "id">,
        value: string
    ) => {
        setSchedule((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };

    const addSchedule = () => {
        setSchedule((prev) => [
            ...prev,
            {
                id: nextId,
                time_from: "",
                time_to: "",
                subject: "",
            },
        ]);

        setNextId((prev) => prev + 1);
    };

    const removeSchedule = (id: number) => {
        setSchedule((prev) =>
            prev.filter((row) => row.id !== id)
        );
    };

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const sortedSchedule = [...schedule].sort((a, b) =>
            a.time_from.localeCompare(b.time_from)
        );

        for (let i = 0; i < sortedSchedule.length; i++) {
            const current = sortedSchedule[i];

            if (current.time_from >= current.time_to) {
                setError("Time To must be later than Time From.");
                return;
            }

            if (
                i > 0 &&
                current.time_from < sortedSchedule[i - 1].time_to
            ) {
                setError("Schedule periods cannot overlap.");
                return;
            }
        }

        const payload = {
            class_id: formData.class_id,
            day: formData.day,
            schedule: sortedSchedule.map(({ id, ...row }) => row),
        };

        const response = await create_timetable(payload)
        
      if (response) {



        navigate("/timetable", {
          state: {
            toast_message: response?.data?.message,
            toast_type: "success"
          }
        });
      }
    };

    const inputClass =
        "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    return (
        <div className="w-full max-w-4xl rounded-lg border border-slate-200 bg-white">

            {/* Form Header */}
            <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="text-sm font-semibold text-slate-700">
                    Time Table Details
                </h2>
            </div>

            <form onSubmit={handleSubmit}>

                {/* Form Body */}
                <div className="p-6">

                    {/* Class, Section, Day */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                        {/* Class */}
                        <div>
                            <label className="mb-2 block text-xs font-medium text-slate-600">
                                Class <span className="text-red-500">*</span>
                            </label>

                            <div className="relative">
                                <select
                                    name="class_id"
                                    value={formData.class_id}
                                    onChange={handleChange}
                                    required
                                    className={`${inputClass} appearance-none pr-10`}
                                >
                                    <option value="">Select Class</option>
                                    
                                    {
                                        classes.map((item: any) => (
                                            <option value={item?._id}>
                                                {item?.class_name} - {item?.section.toUpperCase()}
                                            </option>
                                        ))
                                    }
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Section */}
                        {/* <div>
                            <label className="mb-2 block text-xs font-medium text-slate-600">
                                Section
                            </label>

                            <input
                                type="text"
                                value={selectedClass?.section.toUpperCase() ?? ""}
                                placeholder="Select class first"
                                readOnly
                                className={`${inputClass} bg-slate-50`}
                            />
                        </div> */}

                        {/* Day */}
                        <div>
                            <label className="mb-2 block text-xs font-medium text-slate-600">
                                Day <span className="text-red-500">*</span>
                            </label>

                            <div className="relative">
                                <select
                                    name="day"
                                    value={formData.day}
                                    onChange={handleChange}
                                    required
                                    className={`${inputClass} appearance-none pr-10`}
                                >
                                    <option value="">Select Day</option>
                                    {days.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Schedule Header */}
                    <div className="mb-4 mt-8 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-700">
                            Schedule
                        </h3>

                        <button
                            type="button"
                            onClick={addSchedule}
                            className="flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                        >
                            <Plus size={15} />
                            Add Period
                        </button>
                    </div>

                    {/* Schedule Table */}
                    <div className="overflow-x-auto rounded-md border border-slate-200">
                        <table className="w-full min-w-[780px] text-left">
                            <thead className="bg-sky-50">
                                <tr>
                                    <th className="px-3 py-3 text-xs font-semibold text-slate-700">
                                        Period
                                    </th>
                                    <th className="px-3 py-3 text-xs font-semibold text-slate-700">
                                        Time From *
                                    </th>
                                    <th className="px-3 py-3 text-xs font-semibold text-slate-700">
                                        Time To *
                                    </th>
                                    <th className="px-3 py-3 text-xs font-semibold text-slate-700">
                                        Subject *
                                    </th>
                                    
                                    <th className="px-3 py-3 text-xs font-semibold text-slate-700">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {schedule.map((row, index) => (
                                    <tr
                                        key={row.id}
                                        className="border-t border-slate-100"
                                    >
                                        {/* Period Number */}
                                        <td className="px-3 py-3 text-sm text-slate-600">
                                            {index + 1}
                                        </td>

                                        {/* Time From */}
                                        <td className="px-3 py-3">
                                            <input
                                                type="time"
                                                value={row.time_from}
                                                onChange={(e) =>
                                                    updateSchedule(row.id, "time_from", e.target.value)
                                                }
                                                className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm"
                                            />
                                        </td>

                                        {/* Time To */}
                                        <td className="px-3 py-3">
                                            <input
                                                type="time"
                                                value={row.time_to}
                                                onChange={(e) =>
                                                    updateSchedule(row.id, "time_to", e.target.value)
                                                }
                                                className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm"
                                            />
                                        </td>

                                        {/* Subject */}
                                        <td className="px-3 py-3">
                                            <select
                                                value={row.subject}
                                                onChange={(e) =>
                                                    updateSchedule(
                                                        row.id,
                                                        "subject",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className={inputClass}
                                            >
                                                <option value="">Select Subject</option>
                                                {subjectOptions.map((subject) => (
                                                    <option key={subject} value={subject}>
                                                        {subject}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>

                                        {/* Remove */}
                                        <td className="px-3 py-3">
                                            <button
                                                type="button"
                                                onClick={() => removeSchedule(row.id)}
                                                // disabled={schedule.length === 1}
                                                className="rounded-md p-2 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {error && (
                        <p className="mt-3 text-sm text-red-500">
                            {error}
                        </p>
                    )}
                </div>

                {/* Form Footer */}
                <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

                    <button
                        type="button"
                        onClick={() => navigate("/TimeTable")}
                        className="rounded-md border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Save Time Table
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTimetable;
