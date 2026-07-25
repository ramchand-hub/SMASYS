import WelcomeCard from "../dashboard/Welcomecard";
import StudentOverview from "../dashboard/StudentOverview";
import NoticeBoardCard from "../dashboard/Noticeboard";
import EarningsChartCard from "../../components/dashboard/EarningsChart";
import StatsCard from "../../common/Statuscard";
import CalendarCard from "../../components/dashboard/CalenderCard";
import FinancialOverviewCard from "../dashboard/Financial_overview";
import FeeStatusCard from "../../components/dashboard/FeeStatus";
import MessagesCard from "../../components/dashboard/Messages";
import { GraduationCap, Users, Briefcase } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="bg-[#F5F7FB] min-h-screen">

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT SECTION */}
        <div className="col-span-8 space-y-6">

          <WelcomeCard />

          <div className="grid grid-cols-2 gap-6">
            <StudentOverview />
            <NoticeBoardCard />
          </div>

          <EarningsChartCard />

        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-4 space-y-6">

          {/* Top */}
          <div className="grid grid-cols-5 gap-5">

            {/* Stats */}
            <div className="col-span-2 space-y-5">

              <StatsCard
                title="Students"
                value="5,909"
                bgColor="bg-[#FFE97A]"
              />

              <StatsCard
                title="Teachers"
                value="60"
                bgColor="bg-[#E6DBFF]"
              />

              <StatsCard
                title="Employee"
                value="100"
                bgColor="bg-[#FFE97A]"
              />

            </div>

            {/* Calendar */}
            <div className="col-span-3">
              <CalendarCard />
            </div>

          </div>

          {/* Financial */}
          <FinancialOverviewCard />

          {/* Bottom */}
          <div className="grid grid-cols-2 gap-5">

            <FeeStatusCard />

            <MessagesCard />

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;
