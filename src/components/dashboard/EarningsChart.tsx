import Chart from "react-apexcharts";
import Card from "../../common/Card";
import { MoreHorizontal } from "lucide-react";
import { ApexOptions } from "apexcharts";

const EarningsChartCard = () => {
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    stroke: {
      curve: "smooth",
      width: 4,
    },

    colors: ["#8B5CF6"],

    dataLabels: {
      enabled: false,
    },

    grid: {
      borderColor: "#F1F5F9",
      strokeDashArray: 5,
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
      ],

      labels: {
        style: {
          colors: "#94A3B8",
        },
      },

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      min: 0,
      max: 6000,
      tickAmount: 6,

      labels: {
        formatter: (val) => `${val / 1000}k`,
      },
    },

    tooltip: {
      theme: "dark",
    },

    legend: {
      show: false,
    },
  };

  const series = [
    {
      name: "Earnings",
      data: [1800, 2400, 3200, 2900, 4100, 3700, 5200],
    },
  ];

  return (
    <Card
      title="Earnings"
      headerRight={
        <button>
          <MoreHorizontal size={20} />
        </button>
      }
    >
      <Chart
        options={options}
        series={series}
        type="line"
        height={320}
      />
    </Card>
  );
};

export default EarningsChartCard;