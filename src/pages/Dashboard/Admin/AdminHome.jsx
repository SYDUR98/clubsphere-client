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

const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

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

  // Chart Global Dark Mode Options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "rgb(156, 163, 175)", // Dark mode friendly text (gray-400)
          font: { weight: 'bold' }
        }
      }
    },
    scales: {
      y: {
        ticks: { color: "rgb(156, 163, 175)" },
        grid: { color: "rgba(156, 163, 175, 0.1)" }
      },
      x: {
        ticks: { color: "rgb(156, 163, 175)" },
        grid: { display: false }
      }
    }
  };

  const lineChartData = {
    labels: paymentsOverTime.map((p) => `${monthNames[p.month]}-${p.year}`),
    datasets: [
      {
        label: "Revenue Over Time (৳)",
        data: paymentsOverTime.map((p) => p.amount),
        borderColor: "#818CF8",
        backgroundColor: "rgba(129, 140, 248, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#38BDF8",
      },
    ],
  };

  const barChartData = {
    labels: membershipsPerClub.map((c) => c.clubName),
    datasets: [
      {
        label: "Members per Club",
        data: membershipsPerClub.map((c) => c.count),
        backgroundColor: "rgba(251, 191, 36, 0.7)",
        borderRadius: 5,
      },
    ],
  };

  const pieChartData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        data: [
          clubStatusDistribution.pending || 0,
          clubStatusDistribution.approved || 0,
          clubStatusDistribution.rejected || 0,
        ],
        backgroundColor: [
          "rgba(250, 204, 21, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: "transparent",
      },
    ],
  };

  const topClubsData = {
    labels: top5Clubs.map((c) => c.clubName),
    datasets: [
      {
        label: "Members",
        data: top5Clubs.map((c) => c.count),
        backgroundColor: "rgba(56, 189, 248, 0.7)",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="p-6 bg-slate-50 dark:bg-base-100 min-h-screen transition-colors duration-300">
      {/* Animated Header */}
      <div className="mb-10">
        <h2
          className="text-2xl md:text-4xl font-extrabold text-center bg-clip-text text-transparent tracking-wide"
          style={{
            backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
            backgroundSize: "300% 300%",
            animation: "gradientMove 15s ease-in-out infinite",
          }}
        >
          ADMIN DASHBOARD
        </h2>
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Total Users", value: totalUsers, color: "text-primary", bg: "bg-blue-50" },
          { title: "Total Clubs", value: totalClubs, color: "text-secondary", bg: "bg-purple-50" },
          { title: "Pending Clubs", value: pendingClubs, color: "text-warning", bg: "bg-yellow-50" },
          { title: "Approved Clubs", value: approvedClubs, color: "text-success", bg: "bg-green-50" },
          { title: "Rejected Clubs", value: rejectedClubs, color: "text-error", bg: "bg-red-50" },
          { title: "Total Events", value: totalEvents, color: "text-accent", bg: "bg-teal-50" },
        ].map((card, idx) => (
          <div key={idx} className="stat bg-white dark:bg-base-200 border border-slate-200 dark:border-base-300 shadow-lg rounded-2xl hover:scale-[1.02] transition-transform">
            <div className="stat-title font-bold text-slate-500 dark:text-slate-400">{card.title}</div>
            <div className={`stat-value ${card.color}`}>{card.value}</div>
          </div>
        ))}
        <div className="stat bg-white dark:bg-base-200 border border-slate-200 dark:border-base-300 shadow-lg rounded-2xl col-span-full">
          <div className="stat-title font-bold text-slate-500 dark:text-slate-400">Total Payments (৳)</div>
          <div className="stat-value text-info">৳ {totalPayments.toLocaleString()}</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-base-200 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-base-300">
          <h3 className="font-bold text-lg mb-6 text-slate-800 dark:text-white border-l-4 border-primary pl-3">
            Revenue Over Last 6 Months
          </h3>
          <Line data={lineChartData} options={chartOptions} />
        </div>

        <div className="bg-white dark:bg-base-200 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-base-300">
          <h3 className="font-bold text-lg mb-6 text-slate-800 dark:text-white border-l-4 border-warning pl-3">
            Members per Club
          </h3>
          <Bar data={barChartData} options={chartOptions} />
        </div>

        <div className="bg-white dark:bg-base-200 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-base-300">
          <h3 className="font-bold text-lg mb-6 text-slate-800 dark:text-white border-l-4 border-success pl-3">
            Club Status Distribution
          </h3>
          <div className="max-w-[300px] mx-auto">
            <Pie data={pieChartData} />
          </div>
        </div>

        <div className="bg-white dark:bg-base-200 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-base-300">
          <h3 className="font-bold text-lg mb-6 text-slate-800 dark:text-white border-l-4 border-info pl-3">
            Top 5 Clubs by Members
          </h3>
          <Bar 
            data={topClubsData} 
            options={{ 
              ...chartOptions, 
              indexAxis: "y",
              plugins: { ...chartOptions.plugins, legend: { display: false } } 
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;