 import React from "react";
 import {
   ChevronLeft,
   ChevronRight,
 } from "lucide-react";
 
 const Pagination = () => {
    return(
<div
          className="
            flex
            items-center
            justify-between
            px-3
            py-2
            border-t
            border-slate-100
          "
        >

          <p className="text-[8px] text-slate-400">
            Showing 1 to 6 of 6
          </p>


          {/* Pagination */}
          <div className="flex items-center gap-1">

            <button
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded
                border
                border-slate-200
                text-slate-400
                hover:bg-slate-50
              "
            >
              <ChevronLeft size={10} />
            </button>


            <button
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded
                bg-blue-600
                text-[8px]
                font-medium
                text-white
              "
            >
              1
            </button>


            <button
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded
                border
                border-slate-200
                text-[8px]
                text-slate-500
                hover:bg-slate-50
              "
            >
              2
            </button>


            <button
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded
                border
                border-slate-200
                text-slate-400
                hover:bg-slate-50
              "
            >
              <ChevronRight size={10} />
            </button>

          </div>

        </div>
    )
 }
 export default Pagination