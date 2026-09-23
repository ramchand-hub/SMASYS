import React, { useEffect, useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import {
  create_student,
  update_student
} from "../../Services/Allservice";
import {
  useNavigate,
  useLocation
} from "react-router-dom";

const Addstudent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const student = location.state?.student;
  console.log(student,'student data...')
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    class: "",
    rollno: "",
    dob: "",
    gender: "",
    address: "",
  });

  // Populate form when editing
  useEffect(() => {
    if (student) {
      setFormData({
        first_name: student.first_name || "",
        last_name: student.last_name || "",
        class: student.class || "",
        rollno: student.rollno || "",
        dob: student.dob || "",
        gender: student.gender || "",
        address: student.address || "",
      });
    }
  }, [student]);

  // Common change handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create / Update
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response;

      if (student) {
        // EDIT
        response = await update_student(
          student._id,
          formData
        );
      } else {
        // CREATE
        response = await create_student(formData);
      }

      if (response) {
        navigate("/students");
      }

    } catch (err) {
      console.error("Error in student submit:", err);
    }
  };

  return (
    <div className="w-full max-w-4xl rounded-lg border border-slate-200 bg-white">

      {/* Form Header */}
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-sm font-semibold text-slate-700">
          {student ? "Edit Student" : "Student Information"}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Form Body */}
        <div className="p-6">

          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Name */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                First_Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Lastname */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Last_name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter email"
                className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* Row 2 */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Class */}

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                class <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Class</option>
                  <option value="class1">class1</option>
                  <option value="class2">class2</option>
                  <option value="class3">class3</option>
                  <option value="class4">class4</option>
                  <option value="class5">class5</option>


                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>


            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Rollno <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                placeholder="Enter Roll"
                className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Dob */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Dob
              </label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Enter dob"
                className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="mb-3 block text-xs font-medium text-slate-600">
                Gender <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-6">

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="h-4 w-4 accent-blue-600"
                  />

                  <span className="text-sm text-slate-600">
                    Male
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="Gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="h-4 w-4 accent-blue-600"
                  />

                  <span className="text-sm text-slate-600">
                    Female
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="Gender"
                    value="other"
                    checked={formData.gender === "other"}
                    onChange={handleChange}
                    className="h-4 w-4 accent-blue-600"
                  />

                  <span className="text-sm text-slate-600">
                    Other
                  </span>
                </label>

              </div>
            </div>



          </div>

          {/* Address */}
          <div className="mt-5">
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Address
            </label>

            <textarea
              rows={4}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full resize-none rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

        </div>

        {/* Form Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

          <button
            type="button"
            onClick={() => navigate("/students")}
            className="rounded-md border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {student ? "Update student" : "Save student"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default Addstudent;