import Card from "../../common/Card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { MoreHorizontal } from "lucide-react";

const StudentOverviewCard = () => {
  return (
    <Card
      title="Students"
      headerRight={
        <button>
          <MoreHorizontal size={20} />
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-8">

        {/* Boys */}

        <div className="flex flex-col items-center">

          <div className="w-36 h-36">

            <CircularProgressbar
              value={53}
              text="53%"
              strokeWidth={10}
              styles={buildStyles({
                pathColor: "#B8B4FF",
                trailColor: "#F2F3F7",
                textColor: "#111827",
                textSize: "18px",
              })}
            />

          </div>

          <div className="mt-5 flex items-center gap-2">

            <div className="w-2 h-2 rounded-full bg-violet-400"></div>

            <span className="text-sm text-gray-600">
              3,178 <span className="text-gray-400">(boys)</span>
            </span>

          </div>

        </div>

        {/* Girls */}

        <div className="flex flex-col items-center">

          <div className="w-36 h-36">

            <CircularProgressbar
              value={47}
              text="47%"
              strokeWidth={10}
              styles={buildStyles({
                pathColor: "#FFD85E",
                trailColor: "#F2F3F7",
                textColor: "#111827",
                textSize: "18px",
              })}
            />

          </div>

          <div className="mt-5 flex items-center gap-2">

            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>

            <span className="text-sm text-gray-600">
              2,731 <span className="text-gray-400">(Girls)</span>
            </span>

          </div>

        </div>

      </div>
    </Card>
  );
};

export default StudentOverviewCard;