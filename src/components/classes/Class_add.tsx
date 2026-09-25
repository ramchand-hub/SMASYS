import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  create_class,
  updateclass
} from "../../Services/Allservice";
import {
  useNavigate,
  useLocation
} from "react-router-dom";

const AddClass = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const class_val = location.state?.class;

  const [formData, setFormData] = useState({
    class_name: "",
    section:"",
    max_students:"",
    class_teacher:""
  });

  // Populate form when editing
  useEffect(() => {
    if (class_val) {
      setFormData({
        class_name: class_val.class_name || "",
        section: class_val.section || "",
        max_students:class_val.max_students || "",
        class_teacher:class_val.class_teacher || "",
      });
    }
  }, [class_val]);

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

      if (class_val) {
        // EDIT
        response = await updateclass(
          class_val._id,
          formData
        );
      } else {
        // CREATE
        response = await create_class(formData);
      }

      if (response) {
        navigate("/classes", {
          state: {
            toast_message: response?.data?.toast_message,
            toast_type: "success"
          }
        });
      }

    } catch (err) {
      console.error("Error in class submit:", err);
    }
  };

  return (
    <div className="w-full max-w-4xl rounded-lg border border-slate-200 bg-white">

      {/* Form Header */}
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-sm font-semibold text-slate-700">
          {class_val ? "Edit class" : "class Information"}
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
                Classes Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  name="class_name"
                  value={formData.class_name}
                  onChange={handleChange}
                  className="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Class</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">
                    Class 6
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            {/* section */}
            
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                 Section <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Section</option>
                  <option value="Class 1">A</option>
                  <option value="Class 2">B</option>
                  <option value="Class 3">C</option>
                 
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

          </div>

          {/* Row 2 */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Maximum students */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Maximum students <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="max_students"
                value={formData.max_students}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Class Teacher */}
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Class Teacher <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  name="class_teacher"
                  value={formData.class_teacher}
                  onChange={handleChange}
                  className="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Subject</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="english">English</option>
                  <option value="science">Science</option>
                  <option value="computer">Computer</option>
                  <option value="social-science">
                    Social Science
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

          </div>

          

        </div>

        {/* Form Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

          <button
            type="button"
            onClick={() => navigate("/classes")}
            className="rounded-md border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {class_val ? "Update class" : "Save class"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default AddClass;