import React from "react";
import useAuth from "../../../hooks/useAuth"; 
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import { useQuery } from "@tanstack/react-query"; 

const MemberStats = () => {
  const { user } = useAuth(); // Get the currently logged-in user
  const axiosSecure = useAxiosSecure();

  // Use useQuery to fetch member statistics
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["memberStats", user?.email], 
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/stats?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // Destructure the fetched data
  const { totalClubsJoined, totalEventsRegistered, totalSpent } = stats;

  return (
    <div className="stats shadow w-full my-6 bg-white border border-gray-200">
      {/* Total Clubs Joined */}
      <div className="stat">
        <div className="stat-figure text-primary">
          {/* SVG for Clubs Joined */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Clubs Joined</div>
        <div className="stat-value text-primary">{totalClubsJoined}</div>
        <div className="stat-desc">Active memberships</div>
      </div>

      {/* Total Events Registered */}
      <div className="stat">
        <div className="stat-figure text-secondary">
          {/* SVG for Events Registered */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 12h14M5 16h14"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Events Registered</div>
        <div className="stat-value text-secondary">{totalEventsRegistered}</div>
        <div className="stat-desc">Confirmed event spots</div>
      </div>

      {/* Total Spent */}
      <div className="stat">
        <div className="stat-figure text-info">
          {/* SVG for Total Spent */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Spent</div>
        <div className="stat-value text-info">${totalSpent}</div>
        <div className="stat-desc">Membership & Event fees</div>
      </div>
    </div>
  );
};

export default MemberStats;
