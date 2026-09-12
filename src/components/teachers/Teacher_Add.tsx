import React from "react";
import { ChevronDown } from "lucide-react";

const AddTeacher = () => {
  return (
    <div className="w-full max-w-4xl rounded-lg border border-slate-200 bg-white">

      {/* Form Header */}
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-sm font-semibold text-slate-700">
          Teacher Information
        </h2>
      </div>

      {/* Form Body */}
      <div className="p-6">

        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Name */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none
                         placeholder:text-slate-400
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Email <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none
                         placeholder:text-slate-400
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

        </div>

        {/* Row 2 */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Phone */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Phone Number <span className="text-red-500">*</span>
            </label>

            <input
              type="tel"
              placeholder="Enter phone number"
              className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none
                         placeholder:text-slate-400
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Subject <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <select
                className="h-10 w-full appearance-none rounded-md border border-slate-200
                           bg-white px-3 pr-10 text-sm text-slate-500 outline-none
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select Subject</option>
                <option value="mathematics">Mathematics</option>
                <option value="english">English</option>
                <option value="science">Science</option>
                <option value="computer">Computer</option>
                <option value="social-science">Social Science</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2
                           -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

        </div>

        {/* Row 3 */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

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
                  defaultChecked
                  className="h-4 w-4 accent-blue-600"
                />
                <span className="text-sm text-slate-600">
                  Male
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="h-4 w-4 accent-blue-600"
                />
                <span className="text-sm text-slate-600">
                  Female
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  className="h-4 w-4 accent-blue-600"
                />
                <span className="text-sm text-slate-600">
                  Other
                </span>
              </label>

            </div>
          </div>

          {/* Qualification */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Qualification
            </label>

            <input
              type="text"
              placeholder="Enter qualification"
              className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none
                         placeholder:text-slate-400
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

        </div>

        {/* Address */}
        <div className="mt-5">
          <label className="mb-2 block text-xs font-medium text-slate-600">
            Address
          </label>

          <textarea
            rows={4}
            placeholder="Enter address"
            className="w-full resize-none rounded-md border border-slate-200 px-3 py-2.5
                       text-sm outline-none placeholder:text-slate-400
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

      </div>

      {/* Form Footer */}
      <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

        <button
          type="button"
          className="rounded-md border border-slate-200 bg-white px-5 py-2
                     text-sm font-medium text-slate-600
                     hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-5 py-2
                     text-sm font-medium text-white
                     hover:bg-blue-700"
        >
          Save Teacher
        </button>

      </div>

    </div>
  );
};

export default AddTeacher;