import React, { useEffect, useState } from "react";
import {
    Search,
    SlidersHorizontal,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";
import Pagination from "../../common/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteclass, classsList } from "../../Services/Allservice";
import Toaster from "../../common/toaster";

type ToastType = "success" | "error" | "warning" | "info";

const ClassList = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const [classDelete, setclassDelete] = useState<boolean>(false)
    const [Totalpages, setTotalPages] = useState<any>()
    const [classcount, setclasscount] = useState()
    const [page, setPage] = useState(1)
    const pagesize = 5
    const [showtoast, setShowtoast] = useState(false)
    const [toast_message, setToastmessage] = useState("")
    const [toast_type, setToasttype] = useState<ToastType>("success")
    const [search, setSearch] = useState("")
    const [classes, setClasses] = useState<any[]>([])
    useEffect(() => {
        if (location.state?.toast_message) {
            setToastmessage(location?.state?.toast_message);
            setToasttype(location.state?.toast_type);
            setShowtoast(true);

            // Clear navigation state
            window.history.replaceState({}, document.title);
        }
    }, [location?.state])

    const addclass = () => {
        try {
            navigate("/classes-add")
        } catch (err) {
            console.error(err)
        }
    }

    const handlenext = () => {

        setPage(page + 1)
    }

    const handleprevious = () => {
        if (page > 1) {
            setPage(page - 1)
        }

    }

    const handleSearch = (e: any) => {
        try {
            setSearch(e.target.value)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        try {
            const classsLists = async () => {
                try {
                    const payload = {
                        page: page,
                        pagesize: pagesize,
                        searchquery: search
                    }
                    const response = await classsList(payload.page, payload.pagesize, payload.searchquery)
                    if (response) {
                        setClasses(response?.data?.classeslist)
                        setTotalPages(response?.data?.pagination.total_pages)
                        setclasscount(response?.data?.pagination.class_count)

                    }

                } catch (err) {
                    console.error(err)
                }
            }

            classsLists()

        } catch (err) {
            console.error("error in classs list", err)
        }
    }, [classDelete, page, search])

    const handleEdit = (clas: any) => {
        try {
            navigate("/classes-add", {
                state: {
                    clas: classes
                }
            })
        } catch (err) {
            console.error("error in edit class", err)
        }
    }

    const handleDelete = async (cls: any) => {
        try {
            const response = await deleteclass(cls._id)
            if (response) {
                setclassDelete(true)
                setShowtoast(true)
                setToastmessage(response?.data?.message)
                setToasttype("success")
            }
        } catch (err) {
            console.error("error in delete class", err)
        }
    }
    return (
        <div className="w-full">

            {/* ================= HEADER ================= */}
            <div className="flex items-start justify-between mb-4">

                <div>
                    <h1 className="text-[18px] font-semibold text-slate-800">
                        classs
                    </h1>

                    <div className="flex items-center gap-1 mt-1 text-[9px]">
                        <span className="text-slate-400">
                            Dashboard
                        </span>

                        <span className="text-slate-300">
                            /
                        </span>

                        <span className="text-blue-500">
                            classs
                        </span>
                    </div>
                </div>

                {/* Add class */}
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
                    onClick={addclass}
                >
                    <Plus size={12} />
                    Add class
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
                            type="search"
                            placeholder="Search classs..."
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
                            onChange={handleSearch}

                        />

                    </div>

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
                                    Class Name
                                </th>

                                <th className="px-3 py-2 text-left text-[9px] font-semibold text-slate-500">
                                    Section
                                </th>

                                <th className="px-3 py-2 text-left text-[9px] font-semibold text-slate-500">
                                    Students
                                </th>

                                <th className="px-3 py-2 text-center text-[9px] font-semibold text-slate-500">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        {/* TABLE BODY */}
                        <tbody>

                            {
                                classes?.length > 0 ? (
                                    classes?.map((cl, index) => (

                                        <tr
                                            className="
                    border-b
                    border-slate-100
                    last:border-0
                    hover:bg-blue-50/30
                  "
                                            key={index}
                                        >


                                            <td className="px-3 py-2 text-[9px] text-slate-500">
                                                {index + 1}
                                            </td>


                                            {/* classname */}
                                            <td className="px-3 py-2">

                                                <span className="text-[9px] font-medium text-slate-700">
                                                    {cl.class_name}
                                                </span>

                                            </td>


                                            {/* section */}
                                            <td className="px-3 py-2 text-[9px] text-slate-500">
                                                {cl.section}
                                            </td>


                                            {/* max_students */}
                                            <td className="px-3 py-2 text-[9px] text-slate-500">
                                                {cl.max_students}
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
                                                        onClick={() => handleEdit(cl)}
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
                                                        onClick={() => handleDelete(cl)}
                                                    >
                                                        <Trash2 size={10} />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))
                                )

                                    :
                                    <tr>
                                        <td colSpan={3} className="text-center py-4">
                                            No classes found
                                        </td>
                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

                <Pagination

                    totalpages={Totalpages}
                    page={page}
                    pagesize={pagesize}
                    count={classcount}
                    next={handlenext}
                    previous={handleprevious}
                />
                {
                    showtoast && (
                        <Toaster

                            toast_message={toast_message}
                            onClose={() => setShowtoast(false)}
                            type={toast_type}

                        />
                    )
                }

            </div>

        </div>
    );
};

export default ClassList;