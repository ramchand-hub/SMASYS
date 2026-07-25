import Chart from "react-apexcharts";
import Card from "../../common/Card";
import { MoreHorizontal } from "lucide-react";
import { ApexOptions } from "apexcharts";

const EarningsChartCard = () => {
  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    colors: ["#A7E1FB", "#C7BEFF"],

    stroke: {
      curve: "smooth",
      width: 5,
      lineCap: "round",
    },

    dataLabels: {
      enabled: false,
    },

    markers: {
      size: 0,
      hover: {
        size: 8,
      },
    },

    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
      markers: {
        size: 8,
        strokeWidth: 0,
        fillColors: ["#A7E1FB", "#C7BEFF"],
      },
      itemMargin: {
        horizontal: 20,
      },
    },

    grid: {
      borderColor: "#ECECF5",
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
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },

      labels: {
        style: {
          colors: "#555",
          fontSize: "15px",
        },
      },
    },

    yaxis: {
      min: 0,
      max: 1000,
      tickAmount: 4,

      labels: {
        formatter: (val) => `${val}K`,
        style: {
          colors: "#555",
          fontSize: "15px",
        },
      },
    },

    tooltip: {
      theme: "light",
      shared: true,

      y: {
        formatter: (val) => `$${val.toFixed(3)}K`,
      },
    },
  };

  const series = [
    {
      name: "Income",
      data: [580, 860, 560, 610, 720, 650, 880, 850, 900, 760, 600, 940],
    },
    {
      name: "Expense",
      data: [390, 570, 340, 420, 540, 380, 420, 330, 500, 590, 330, 620],
    },
  ];

  return (
    <Card
      title="Earnings"
      className="rounded-3xl bg-white shadow-sm border border-gray-100"
      headerRight={
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <MoreHorizontal size={20} className="text-gray-600" />
        </button>
      }
    >
      <Chart options={options} series={series} type="line" height={360} />
    </Card>
  );
};

export default EarningsChartCard;
