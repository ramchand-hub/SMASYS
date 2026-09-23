import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface paginate {
  totalpages: number | undefined
  page: number 
  pagesize: number
  count: any
}
const Pagination: React.FC<paginate> = ({
  totalpages,
  count,
  page,
  pagesize
}) => {
  const start = (page -1) * pagesize + 1
  const end = Math.min(page * pagesize, count)
  return (
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
        Showing {start} to {end} of {count}
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
          {totalpages}
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