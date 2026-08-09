import React from 'react'
import Card from '../common/Card'

const Form = () => {
  return (
    <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-7'>
            
          <Card title="Basic Information">
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

        </div>
        <div className='col-span-5'>
            Login Details
        </div>
      
    </div>
  )
}

export default Form
