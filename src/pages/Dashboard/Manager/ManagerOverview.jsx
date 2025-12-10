import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ManagerOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["manager-overview", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/overview");
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const {
    numberOfClubs = 0,
    totalMembers = 0,
    totalEvents = 0,
    totalPaymentsReceived = 0,
  } = stats;

  return (
    <div className="p-6">
        <h2
        className="
          text-3xl font-extrabold mb-6 text-center
          bg-gradient-to-r from-primary via-secondary to-accent
          bg-clip-text text-transparent
        "
      >
        Manager Dashboard
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Number of Clubs */}
        <div className="stat bg-base-200 border border-base-300 shadow-lg rounded-xl p-5">
          <div className="stat-title text-neutral">Clubs You Manage</div>
          <div className="stat-value text-primary text-3xl font-bold">
            {numberOfClubs}
          </div>
          <div className="stat-desc text-sm text-neutral">
            Active clubs under your management
          </div>
        </div>

        {/* Total Members */}
        <div className="stat bg-base-200 border border-base-300 shadow-lg rounded-xl p-5">
          <div className="stat-title text-neutral">Total Active Members</div>
          <div className="stat-value text-secondary text-3xl font-bold">
            {totalMembers}
          </div>
          <div className="stat-desc text-sm text-neutral">
            Members across all your clubs
          </div>
        </div>

        {/* Total Events */}
        <div className="stat bg-base-200 border border-base-300 shadow-lg rounded-xl p-5">
          <div className="stat-title text-neutral">Total Events</div>
          <div className="stat-value text-accent text-3xl font-bold">
            {totalEvents}
          </div>
          <div className="stat-desc text-sm text-neutral">
            Events (upcoming + past)
          </div>
        </div>

        {/* Total Payments Received (full width) */}
        <div className="stat bg-base-200 border border-base-300 shadow-lg rounded-xl p-5 col-span-full">
          <div className="stat-title text-neutral">Total Payments Received (৳)</div>
          <div className="stat-value text-info text-3xl font-bold">
            {Number(totalPaymentsReceived || 0).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="stat-desc text-sm text-neutral">
            All payments collected for your clubs
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;
