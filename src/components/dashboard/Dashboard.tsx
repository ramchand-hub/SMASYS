import WelcomeCard from "../dashboard/Welcomecard";
// import StudentOverviewCard from "../dashboard/";
import NoticeBoardCard from "../dashboard/Noticeboard";
// import EarningsChartCard from "../components/dashboard/EarningsChartCard";
// import StatsCard from "../components/common/StatsCard";
// import CalendarCard from "../components/dashboard/CalendarCard";
import FinancialOverviewCard from "../dashboard/Financial_overview";
// import FeeStatusCard from "../components/dashboard/FeeStatusCard";
// import MessagesCard from "../components/dashboard/MessagesCard";

const DashboardPage = () => {
  return (
    <div className="bg-[#F5F7FB] min-h-screen p-6">

      <div className="grid grid-cols-12 gap-6">

        {/* ================= LEFT SECTION ================= */}

        <div className="col-span-12 xl:col-span-8 space-y-6">

          <WelcomeCard />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* <StudentOverviewCard /> */}

            <NoticeBoardCard />

          </div>

          {/* <EarningsChartCard /> */}

        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="col-span-12 xl:col-span-4 space-y-6">

          {/* Stats + Calendar */}

          <div className="grid grid-cols-12 gap-4">

            {/* Left */}

            {/* <div className="col-span-6 space-y-4">

              <StatsCard
                title="Students"
                value="5,909"
                bgColor="bg-yellow-200"
              />

              <StatsCard
                title="Teachers"
                value="60"
                bgColor="bg-violet-200"
              />

              <StatsCard
                title="Employee"
                value="100"
                bgColor="bg-yellow-200"
              />

            </div> */}

            {/* Right */}

            <div className="col-span-6">

              {/* <CalendarCard /> */}

            </div>

          </div>

          <FinancialOverviewCard />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* <FeeStatusCard /> */}

            {/* <MessagesCard /> */}

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;