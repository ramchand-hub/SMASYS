import React from "react";
import Card from "../../common/Card";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { create_student } from "../../Services/Allservice";
const Student_Add = () => {
  const navigate = useNavigate();
  const handleback = () => {
    navigate("/students");
  };

  const Studentadd = async () => {
    try {
      const payload = {};
      const response = await create_student(payload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button type="button" onClick={handleback}>
        Back
      </Button>

      <div className="flex justify-end gap-3 mb-4">
        <Button type="button">Cancel</Button>
        <Button type="button">reset</Button>
        <Button type="button" onClick={Studentadd}>
          Save
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <Card title="Basic Information" className="mb-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Side */}
              <div className="space-y-5">
                {/* First Name */}
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-3">
                    Gender
                  </label>

                  <div className="flex items-center gap-10">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        className="accent-blue-600"
                        defaultChecked
                      />
                      <span>Male</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        className="accent-blue-600"
                      />
                      <span>Female</span>
                    </label>
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none"
                  />
                </div>

                {/* Class & Section */}
                <div className="grid grid-cols-2 gap-3">
                  <select className="h-11 border border-gray-300 rounded-lg px-3 bg-[#F5F3FF]">
                    <option>Class</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                  </select>

                  <select className="h-11 border border-gray-300 rounded-lg px-3 bg-[#F5F3FF]">
                    <option>Section</option>
                    <option>A</option>
                    <option>B</option>
                  </select>
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-5">
                {/* Last Name */}
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl h-[235px] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl border flex items-center justify-center text-3xl">
                    📄
                  </div>

                  <p className="mt-5 text-gray-700">
                    Drop your files to upload
                  </p>

                  <button className="mt-4 px-6 py-2 border rounded-full text-sm hover:bg-gray-100">
                    Select files
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Parent Details" className="mb-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Side */}
              <div className="space-y-5">
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Father Name
                  </label>

                  <input
                    type="text"
                    placeholder="Father Name"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Father Contact
                  </label>

                  <input
                    type="text"
                    placeholder="Father Contact"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Father Occupation
                  </label>

                  <input
                    type="text"
                    placeholder="Father Occupation"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-5">
                {/* Last Name */}
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Mother Name
                  </label>

                  <input
                    type="text"
                    placeholder="Mother Name"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Mother Contact
                  </label>

                  <input
                    type="text"
                    placeholder="Mother Contact"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Annual Income
                  </label>

                  <input
                    type="text"
                    placeholder="1,00,000"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-5">
          <Card title="Login/Account Details" className="mb-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Side */}
              <div className="space-y-5">
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    User Name
                  </label>

                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-5">
                {/* Last Name */}
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Password
                  </label>

                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Contact Information" className="mb-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Side */}
              <div className="space-y-5">
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Phone
                  </label>

                  <input
                    type="text"
                    placeholder="Contact number"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-5">
                {/* Last Name */}
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Email
                  </label>

                  <input
                    type="text"
                    placeholder="example@gmail.com"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Contact Information" className="mb-4">
            <div className="grid grid-cols-1">
              <div className="space-y-5">
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Address
                  </label>

                  <input
                    type="text"
                    placeholder="Area and Street"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Left Side */}
              <div className="space-y-5">
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-5">
                {/* Last Name */}
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    District
                  </label>

                  <input
                    type="text"
                    placeholder="District"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Left Side */}
              <div className="space-y-5">
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    Pincode
                  </label>

                  <input
                    type="text"
                    placeholder="Pincode"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="space-y-5">
                {/* Last Name */}
                <div>
                  <label className="block text-[18px] font-medium text-gray-800 mb-2">
                    State
                  </label>

                  <input
                    type="text"
                    placeholder="State"
                    className="w-full h-11 border border-gray-300 rounded-lg px-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Student_Add;
