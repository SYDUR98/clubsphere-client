// src/pages/dashboard/admin/AdminHome.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import LoadingPage from "../../../components/Shared/LoadingPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const monthNames = [
  "", // 0-index not used
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
];

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading)
    return (
       <LoadingPage></LoadingPage>
    );

  const {
    totalUsers = 0,
    totalClubs = 0,
    pendingClubs = 0,
    approvedClubs = 0,
    rejectedClubs = 0,
    totalEvents = 0,
    totalPayments = 0,
    paymentsOverTime = [],
    membershipsPerClub = [],
    top5Clubs = [],
    clubStatusDistribution = {},
  } = stats;

  // Chart Data
  const lineChartData = {
    labels: paymentsOverTime.map((p) => `${monthNames[p.month]}-${p.year}`),
    datasets: [
      {
        label: "Revenue Over Time (৳)",
        data: paymentsOverTime.map((p) => p.amount),
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: membershipsPerClub.map((c) => c.clubName),
    datasets: [
      {
        label: "Members per Club",
        data: membershipsPerClub.map((c) => c.count),
        backgroundColor: "rgba(251, 191, 36, 0.7)", // Tailwind yellow-400
      },
    ],
  };

  const pieChartData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        data: [clubStatusDistribution.pending || 0, clubStatusDistribution.approved || 0, clubStatusDistribution.rejected || 0],
        backgroundColor: [
          "rgba(250, 204, 21, 0.7)", // yellow-400
          "rgba(34, 197, 94, 0.7)", // green-500
          "rgba(239, 68, 68, 0.7)", // red-500
        ],
      },
    ],
  };

  const topClubsData = {
    labels: top5Clubs.map((c) => c.clubName),
    datasets: [
      {
        label: "Top 5 Clubs by Members",
        data: top5Clubs.map((c) => c.count),
        backgroundColor: "rgba(59, 130, 246, 0.7)", // blue-500
      },
    ],
  };

  return (
    <div className="p-6 bg-base-100">
        <div>
        <h2
          className="
      text-4xl md:text-3xl font-extrabold mb-8 text-center
      bg-clip-text text-transparent
      tracking-wide
    "
          style={{
            backgroundImage:
              "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
            backgroundSize: "300% 300%",
            animation: "gradientMove 15s ease-in-out infinite", // slow & smooth
          }}
        >
          ADMIN DASHBOARD
        </h2>

        {/* Inline keyframes */}
        <style>
          {`
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}
        </style>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Total Users</div>
          <div className="stat-value text-primary">{totalUsers}</div>
        </div>
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Total Clubs</div>
          <div className="stat-value text-secondary">{totalClubs}</div>
        </div>
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Pending Clubs</div>
          <div className="stat-value text-warning">{pendingClubs}</div>
        </div>
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Approved Clubs</div>
          <div className="stat-value text-success">{approvedClubs}</div>
        </div>
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Rejected Clubs</div>
          <div className="stat-value text-error">{rejectedClubs}</div>
        </div>
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Total Events</div>
          <div className="stat-value text-accent">{totalEvents}</div>
        </div>
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl col-span-full">
          <div className="stat-title text-neutral">Total Payments (৳)</div>
          <div className="stat-value text-info">{totalPayments}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-base-200 p-4 rounded-xl shadow-xl">
          <h3 className="font-bold text-lg mb-3 text-neutral">Revenue Over Last 6 Months</h3>
          <Line data={lineChartData} />
        </div>

        {/* Bar Chart */}
        <div className="bg-base-200 p-4 rounded-xl shadow-xl">
          <h3 className="font-bold text-lg mb-3 text-neutral">Members per Club</h3>
          <Bar data={barChartData} />
        </div>

        {/* Pie Chart */}
        <div className="bg-base-200 p-4 rounded-xl shadow-xl">
          <h3 className="font-bold text-lg mb-3 text-neutral">Club Status Distribution</h3>
          <Pie data={pieChartData} />
        </div>

        {/* Horizontal Bar for Top 5 Clubs */}
        <div className="bg-base-200 p-4 rounded-xl shadow-xl">
          <h3 className="font-bold text-lg mb-3 text-neutral">Top 5 Clubs by Members</h3>
          <Bar
            data={topClubsData}
            options={{ indexAxis: "y" }} // Horizontal bar
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
