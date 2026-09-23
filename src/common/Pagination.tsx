import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface paginate {

  page: number
  pagesize: number
  count: any
  next: () => void;
  previous: () => void;
  totalpages: any
}
const Pagination: React.FC<paginate> = ({
  count,
  page,
  pagesize,
  next,
  previous,
  totalpages
}) => {
  const start = (page - 1) * pagesize + 1
  const end = Math.min(page * pagesize)
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
        Showing {start} to {end} out of {count}
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
          onClick={previous}
          disabled={page === 1}
        >
          <ChevronLeft size={10}


          />
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
          {page}
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
          onClick={next}
          disabled={page >= totalpages}
        >
          <ChevronRight size={10}

          />
        </button>

      </div>

    </div>
  )
}
export default Pagination