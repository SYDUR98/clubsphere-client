import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const {
    totalUsers = 0,
    totalClubs = 0,
    pendingClubs = 0,
    approvedClubs = 0,
    rejectedClubs = 0,
    totalEvents = 0,
    totalPayments = 0,
  } = stats;

  return (
    <div className="p-6 bg-base-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-base-content">
        Admin Dashboard
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Total Users</div>
          <div className="stat-value text-primary">{totalUsers}</div>
        </div>

        {/* Total Clubs */}
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Total Clubs</div>
          <div className="stat-value text-secondary">{totalClubs}</div>
        </div>

        {/* Pending Clubs */}
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Pending Clubs</div>
          <div className="stat-value text-warning">{pendingClubs}</div>
        </div>

        {/* Approved Clubs */}
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Approved Clubs</div>
          <div className="stat-value text-success">{approvedClubs}</div>
        </div>

        {/* Rejected Clubs */}
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Rejected Clubs</div>
          <div className="stat-value text-error">{rejectedClubs}</div>
        </div>

        {/* Total Events */}
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl">
          <div className="stat-title text-neutral">Total Events</div>
          <div className="stat-value text-accent">{totalEvents}</div>
        </div>

        {/* Total Payments */}
        <div className="stat bg-base-200 border border-base-300 shadow-xl rounded-xl col-span-full">
          <div className="stat-title text-neutral">
            Total Payments (৳)
          </div>
          <div className="stat-value text-info">{totalPayments}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
