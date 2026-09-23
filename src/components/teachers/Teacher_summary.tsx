import React, { useEffect, useState } from "react";
import {
    Search,
    SlidersHorizontal,
    Plus,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Pagination from "../../common/Pagination";
import { useNavigate } from "react-router-dom";
import { deleteTeacher, teachersList } from "../../Services/Allservice";


const TeacherList = () => {

    const navigate = useNavigate()
    const [teachers, setTeachers] = useState<any[]>([])
    const [teacherDelete, setTeacherDelete] = useState<boolean>(false)
    const [Totalpages, setTotalPages] = useState<number>()
    const [Teachercount, setTeachercount] = useState()
    const page = 1
    const pagesize = 5

    const addteacher = () => {
        try {
            navigate("/teachers-add")
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        try {
            const teachersLists = async () => {
                try {
                    const payload = {
                        page: page,
                        pagesize: pagesize

                    }
                    const response = await teachersList(payload.page, payload.pagesize)
                    if (response !==null || undefined) {
                        setTeachers(response.data.data.teachers)
                        setTotalPages(response.data.data.pagination.total_pages)
                        setTeachercount(response.data.data.pagination.teacher_count)
                      
                    }

                } catch (err) {
                    console.error(err)
                }
            }

            teachersLists()

        } catch (err) {
            console.error("error in teachers list", err)
        }
    }, [teacherDelete])

    const handleEdit = (teacher: any) => {
        try {
            navigate("/teachers-add", {
                state: {
                    teacher: teacher
                }
            })
        } catch (err) {
            console.error("error in edit teacher", err)
        }
    }

    const handleDelete = async (teacher: any) => {
        try {
            const response = await deleteTeacher(teacher?._id)
            if(response){
                setTeacherDelete(true)
            }
        } catch (err) {
            console.error("error in delete teacher", err)
        }
    }
    return (
        <div className="w-full">

            {/* ================= HEADER ================= */}
            <div className="flex items-start justify-between mb-4">

                <div>
                    <h1 className="text-[18px] font-semibold text-slate-800">
                        Teachers
                    </h1>

                    <div className="flex items-center gap-1 mt-1 text-[9px]">
                        <span className="text-slate-400">
                            Dashboard
                        </span>

                        <span className="text-slate-300">
                            /
                        </span>

                        <span className="text-blue-500">
                            Teachers
                        </span>
                    </div>
                </div>

                {/* Add Teacher */}
                <button
                    className="
            flex items-center gap-1.5
            h-7 px-3
            rounded-md
            bg-blue-600
            text-white
            text-[10px]
            font-medium
            hover:bg-blue-700
            transition
          "
                    onClick={addteacher}
                >
                    <Plus size={12} />
                    Add Teacher
                </button>

            </div>


            {/* ================= CARD ================= */}
            <div
                className="
          w-full
          overflow-hidden
          rounded-md
          border
          border-slate-200
          bg-white
        "
            >

                {/* ================= TOOLBAR ================= */}
                <div
                    className="
            flex
            items-center
            justify-between
            gap-3
            px-3
            py-2
            border-b
            border-slate-100
          "
                >

                    {/* Search */}
                    <div className="relative w-[220px]">

                        <Search
                            size={12}
                            className="
                absolute
                left-2.5
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
                        />

                        <input
                            type="text"
                            placeholder="Search teachers..."
                            className="
                w-full
                h-7
                rounded
                border
                border-slate-200
                bg-slate-50
                pl-7
                pr-2
                text-[10px]
                text-slate-600
                outline-none
                placeholder:text-slate-400
                focus:border-blue-400
                focus:ring-1
                focus:ring-blue-100
              "
                        />

                    </div>


                    {/* Filter */}
                    <button
                        className="
              flex
              items-center
              gap-1.5
              h-7
              px-2.5
              rounded
              border
              border-slate-200
              text-[10px]
              text-slate-500
              hover:bg-slate-50
            "
                    >
                        <SlidersHorizontal size={11} />
                        Filter
                    </button>

                </div>


                {/* ================= TABLE ================= */}
                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        {/* TABLE HEADER */}
                        <thead>

                            <tr className="bg-slate-50 border-b border-slate-100">

                                <th className="px-3 py-2 text-left text-[9px] font-semibold text-slate-500">
                                    ID
                                </th>

                                <th className="px-3 py-2 text-left text-[9px] font-semibold text-slate-500">
                                    Name
                                </th>

                                <th className="px-3 py-2 text-left text-[9px] font-semibold text-slate-500">
                                    Subject
                                </th>

                                <th className="px-3 py-2 text-left text-[9px] font-semibold text-slate-500">
                                    Email
                                </th>

                                <th className="px-3 py-2 text-left text-[9px] font-semibold text-slate-500">
                                    Phone
                                </th>

                                <th className="px-3 py-2 text-center text-[9px] font-semibold text-slate-500">
                                    Status
                                </th>

                                <th className="px-3 py-2 text-center text-[9px] font-semibold text-slate-500">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        {/* TABLE BODY */}
                        <tbody>

                            {teachers.map((teacher, index) => (

                                <tr
                                    className="
                    border-b
                    border-slate-100
                    last:border-0
                    hover:bg-blue-50/30
                  "

                                >


                                    <td className="px-3 py-2 text-[9px] text-slate-500">
                                        {index + 1}
                                    </td>


                                    {/* NAME */}
                                    <td className="px-3 py-2">

                                        <span className="text-[9px] font-medium text-slate-700">
                                            {teacher.name}
                                        </span>

                                    </td>


                                    {/* SUBJECT */}
                                    <td className="px-3 py-2 text-[9px] text-slate-500">
                                        {teacher.subject}
                                    </td>


                                    {/* EMAIL */}
                                    <td className="px-3 py-2 text-[9px] text-slate-500">
                                        {teacher.mail}
                                    </td>


                                    {/* PHONE */}
                                    <td className="px-3 py-2 text-[9px] text-slate-500">
                                        {teacher.contact}
                                    </td>


                                    {/* STATUS */}
                                    <td className="px-3 py-2 text-center">

                                        <span
                                            className={`
                        inline-flex
                        items-center
                        rounded-full
                        px-2
                        py-0.5
                        text-[8px]
                        font-medium

                        ${teacher.status === "Active"
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-red-50 text-red-500"
                                                }
                      `}
                                        >
                                            {teacher.status}
                                        </span>

                                    </td>


                                    {/* ACTION */}
                                    <td className="px-3 py-2">

                                        <div className="flex items-center justify-center gap-1">

                                            {/* Edit */}
                                            <button
                                                className="
                          flex
                          h-5
                          w-5
                          items-center
                          justify-center
                          rounded
                          text-blue-500
                          hover:bg-blue-50
                        "
                                                title="Edit"
                                                onClick={() => handleEdit(teacher)}
                                            >
                                                <Pencil size={10} />
                                            </button>


                                            {/* Delete */}
                                            <button
                                                className="
                          flex
                          h-5
                          w-5
                          items-center
                          justify-center
                          rounded
                          text-red-500
                          hover:bg-red-50
                        "
                                                title="Delete"
                                                onClick={() => handleDelete(teacher)}
                                            >
                                                <Trash2 size={10} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <Pagination 
                
                totalpages ={Totalpages}
                page={page}
                pagesize ={pagesize}
                count = {Teachercount}
                />
            </div>

        </div>
    );
};

export default TeacherList;