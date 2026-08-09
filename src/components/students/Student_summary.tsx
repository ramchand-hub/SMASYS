import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, Eye, Grid2x2 } from "lucide-react";

import CommonTable, { TableColumn } from "../../common/Table";
import { create_student, studentList } from "../../Services/Allservice";
import Add from "../../common/Add";
interface Student {
  id: number;
  last_name: string;
  roll: string;
  class: string;
  accomType: string;
  transport: string;
  location: string;
  student_phone: string;
  rank: string;
  points: number;
}

export default function Student_summary() {

  const [student_list, setStudentList] = useState([]);
  useEffect(() => {
    const getStudentlist = async () => {
      try {
        const response = await studentList();
        setStudentList(response?.data?.students);
      } catch (err) {
        console.error(err);
      }
    };

    getStudentlist();
  }, []);
  
 const columns: TableColumn<Student>[] = [
  {
    header: "Id",
    render: (_row, index) => index + 1,
  },
  {
    header: "Student Name",
      render: (row) => row.last_name || "NA",

  },
  {
    header: "Roll No",
          render: (row) => row.roll || "NA",

  },
  {
    header: "Class",
          render: (row) => row.class || "NA",

  },
  {
    header: "Accom_Type",
          render: (row) => row.accomType || "NA",

  },
   {
    header: "Transport",
          render: (row) => row.transport || "NA",

  },
   {
    header: "Location",
          render: (row) => row.location || "NA",

  },
  {
    header: "Contact",
          render: (row) => row.student_phone || "NA",

  },
  {
    header: "Rank",
          render: (row) => row.rank || "NA",

  },
  {
    header: "Points",
          render: (row) => row.points || "NA",

  },
  {
    header: "Action",
    align: "center",
    render: (row) => (
      <div className="flex items-center justify-center gap-3">
        <Pencil
          size={18}
          className="cursor-pointer text-gray-500 hover:text-blue-600"
          // onClick={() => handleEdit(row)}
        />

        <Trash2
          size={18}
          className="cursor-pointer text-gray-500 hover:text-red-600"
          // onClick={() => handleDelete(row.id)}
        />

      </div>
    ),
  },
];

  const studentCreate = async () => {
    try {
      const payload = {};

      const response = await create_student(payload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-gray-900">Students</h1>

        {/* <Plus size={18} /> */}
        <Add title="New student" onClick={studentCreate} />
      </div>

      {/* Table */}
        <CommonTable 
        
        columns={columns}
        data={student_list}
        />
    </div>
  );
}
