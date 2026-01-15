import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingPage from "../../../components/Shared/LoadingPage";

const ManageClubs = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: clubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/clubs");
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    // Check current theme for SweetAlert styling
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${status} this club?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#22C55E" : "#EF4444",
      cancelButtonColor: "#6B7280",
      background: isDark ? "#1D232A" : "#FFFFFF",
      color: isDark ? "#A6ADBB" : "#1F2937",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.patch(`/admin/clubs/${id}`, { status });

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: "Updated!",
          text: `Club status updated to ${status}`,
          icon: "success",
          background: isDark ? "#1D232A" : "#FFFFFF",
          color: isDark ? "#A6ADBB" : "#1F2937",
        });
      }
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    // Background updated to match ManageUsers
    <div className="p-4 md:p-8 bg-[#F8FAFC] dark:bg-base-100 min-h-screen transition-colors duration-300">
      {/* Animated Header */}
      <div className="mb-10 text-center">
        <h2
          className="text-3xl md:text-4xl font-black bg-clip-text text-transparent tracking-tight uppercase"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
            backgroundSize: "300% 300%",
            animation: "gradientMove 15s ease-in-out infinite",
          }}
        >
          Manage Club Records
        </h2>
        <style>
          {` @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } } `}
        </style>
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto bg-white dark:bg-base-200 shadow-2xl rounded-2xl border border-slate-200 dark:border-base-300">
          <table className="table w-full border-collapse">
            <thead className="bg-slate-800 dark:bg-slate-900">
              <tr className="border-b border-slate-700 dark:border-base-100">
                <th className="py-5 px-6 font-bold uppercase text-[11px] tracking-widest text-white">
                  #
                </th>
                <th className="font-bold uppercase text-[11px] tracking-widest text-white">
                  Club Details
                </th>
                <th className="font-bold uppercase text-[11px] tracking-widest text-white">
                  Manager
                </th>
                <th className="font-bold uppercase text-[11px] tracking-widest text-white">
                  Category
                </th>
                <th className="font-bold uppercase text-[11px] tracking-widest text-white">
                  Status
                </th>
                <th className="font-bold uppercase text-[11px] tracking-widest text-white text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-base-300 bg-white dark:bg-transparent">
              {clubs.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-20 text-neutral font-bold uppercase tracking-widest"
                  >
                    No clubs found in the database.
                  </td>
                </tr>
              ) : (
                clubs.map((club, index) => (
                  <tr
                    key={club._id}
                    className="hover:bg-base-200 transition-all border-b border-base-300"
                  >
                    {/* Index number using theme neutral color */}
                    <td className="px-2 py-1 md:px-4 md:py-2">{index + 1}</td>

                    <td>
                      {/* Main text using 'text-base-content' to ensure it's visible in both modes */}
                      <div className="font-black text-base-content text-base">
                        {club.clubName}
                      </div>
                    </td>

                    <td className="text-base-content/80 font-medium text-sm italic">
                      {club.managerEmail}
                    </td>

                    <td>
                      {/* Using Primary color from your theme for the category badge */}
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-md text-xs font-black border border-primary/20">
                        {club.category}
                      </span>
                    </td>

                    <td>
                      {/* Status badge using your theme's success/error colors */}
                      <div
                        className={`badge badge-md gap-2 font-black py-3 px-4 rounded-lg border-none shadow-sm ${
                          club.status === "approved"
                            ? "bg-success text-success-content"
                            : club.status === "rejected"
                            ? "bg-error text-error-content"
                            : "bg-warning text-warning-content"
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                        {club.status}
                      </div>
                    </td>

                    <td className="text-center p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          disabled={club.status === "approved"}
                          onClick={() =>
                            handleStatusChange(club._id, "approved")
                          }
                          className="btn btn-xs md:btn-sm btn-success text-success-content shadow-md transition-transform active:scale-95 
  disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 disabled:cursor-not-allowed disabled:border-none"
                        >
                          Approve
                        </button>
                        <button
                          disabled={club.status === "rejected"}
                          onClick={() =>
                            handleStatusChange(club._id, "rejected")
                          }
                          className="btn btn-xs md:btn-sm btn-error text-error-content shadow-md transition-transform active:scale-95 
  disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 disabled:cursor-not-allowed disabled:border-none"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageClubs;
