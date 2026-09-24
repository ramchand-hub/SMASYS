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
import { deleteStudent, studentList } from "../../Services/Allservice";
import Toaster from "../../common/toaster";
import { useLocation } from "react-router-dom";
type ToastType = "success" | "error" | "warning" | "info";

const TeacherList = () => {

  const navigate = useNavigate()
  const [students, setstudents] = useState<any[]>([])
  const [studentdelete, setStudentDelete] = useState<boolean>(false)
  const [Totalpages, setTotalPages] = useState<any>()
  const [studentcount, setStudentcount] = useState<any>()
  const [showtoast, setShowtoast] = useState(false)
  const [toast_message, setToastmessage] = useState("")
  const [toast_type, setToasttype] = useState<ToastType>("success")
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const pagesize = 5
  const location = useLocation()

  useEffect(() => {
    if (location.state?.toast_message) {
      setToastmessage(location?.state?.toast_message);
      setToasttype(location.state.toast_type);
      setShowtoast(true);

      // Clear navigation state
      window.history.replaceState({}, document.title);
    }
  }, [location?.state])
  const addstudent = () => {
    try {
      navigate("/student-add")
    } catch (err) {
      console.error(err)
    }
  }
  const handlenext = () => {
    if (page < Totalpages) {
      setPage(page + 1)
    }

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
      const studentLists = async () => {
        try {
          const payload = {
            page: page,
            pagesize: pagesize,
            searchquery: search
          }
          const response = await studentList(payload.page, payload.pagesize, payload.searchquery)

          if (response) {
            setstudents(response?.data?.studentlist)
            setTotalPages(response?.data?.pagination?.Totalpages)
            setStudentcount(response?.data?.pagination?.students_count)

          }

        } catch (err) {
          console.error(err)
        }
      }

      studentLists()

    } catch (err) {
      console.error("error in student list", err)
    }
  }, [studentdelete, page, search])

  const handleEdit = (student: any) => {
    try {
      navigate("/student-add", {
        state: {
          student: student
        }
      })
    } catch (err) {
      console.error("error in edit teacher", err)
    }
  }

  const handleDelete = async (student: any) => {
    try {
      const response = await deleteStudent(student?._id)
      if (response) {
        setStudentDelete(true)
        setShowtoast(true)
        setToastmessage(response?.data?.message)
        setToasttype("success")
      }
    } catch (err) {
      console.error("error in delete student", err)
    }
  }
  return (
    <div className="w-full">

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between mb-4">

        <div>
          <h1 className="text-[18px] font-semibold text-slate-800">
            student
          </h1>

          <div className="flex items-center gap-1 mt-1 text-[9px]">
            <span className="text-slate-400">
              Dashboard
            </span>

            <span className="text-slate-300">
              /
            </span>

            <span className="text-blue-500">
              student
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
          onClick={addstudent}
        >
          <Plus size={12} />
          Add student
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
              placeholder="Search student..."
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
                  First_name
                </th>

                <th className="px-3 py-2 text-left text-[9px] font-semibold text-slate-500">
                  Last_name
                </th>

                <th className="px-3 py-2 text-left text-[9px] font-semibold text-slate-500">
                  Class
                </th>

                <th className="px-3 py-2 text-left text-[9px] font-semibold text-slate-500">
                  Rollno
                </th>

                <th className="px-3 py-2 text-center text-[9px] font-semibold text-slate-500">
                  Dob
                </th>

                <th className="px-3 py-2 text-center text-[9px] font-semibold text-slate-500">
                  Address
                </th>

                <th className="px-3 py-2 text-center text-[9px] font-semibold text-slate-500">
                  Action
                </th>

              </tr>

            </thead>


            {/* TABLE BODY */}
            <tbody>

              {
                students?.length > 0 ? (
                  students?.map((student, index) => (

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
                          {student?.first_name}
                        </span>

                      </td>


                      {/* lastname */}
                      <td className="px-3 py-2 text-[9px] text-slate-500">
                        {student.last_name}
                      </td>


                      {/* Class */}
                      <td className="px-3 py-2 text-[9px] text-slate-500">
                        {student.class}
                      </td>


                      {/* rollno */}
                      <td className="px-3 py-2 text-[9px] text-slate-500">
                        {student.rollno}
                      </td>


                      {/* Dob */}
                      <td className="px-3 py-2 text-center">

                        {student.dob}

                      </td>

                      {/* Address */}
                      <td className="px-3 py-2 text-center">

                        {student.address}

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
                            onClick={() => handleEdit(student)}
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
                            onClick={() => handleDelete(student)}
                          >
                            <Trash2 size={10} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))
                )
                  : <tr>
                    <td colSpan={3} className="text-center py-4">
                      No students found
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
          count={studentcount}
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

export default TeacherList;