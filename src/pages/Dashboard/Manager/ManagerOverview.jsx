import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingPage from "../../../components/Shared/LoadingPage";

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
    return <LoadingPage />;
  }

  const {
    numberOfClubs = 0,
    totalMembers = 0,
    totalEvents = 0,
    totalPaymentsReceived = 0,
  } = stats;

  return (
    <div className="p-4 md:p-8 bg-[#F8FAFC] dark:bg-base-100 min-h-screen transition-colors duration-300">
      
      <div className="mb-12 text-center">
        <h2
          className="text-3xl md:text-4xl font-black bg-clip-text text-transparent tracking-tight uppercase"
          style={{
            backgroundImage: "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
            backgroundSize: "300% 300%",
            animation: "gradientMove 15s ease-in-out infinite",
          }}
        >
          Manager Dashboard
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400 font-bold uppercase text-[12px] tracking-widest">
          Platform Statistics Overview
        </p>
        <style>
          {` @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } } `}
        </style>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Clubs Managed Card */}
        <div className="relative overflow-hidden bg-white dark:bg-base-200 border border-slate-200 dark:border-base-300 shadow-xl rounded-2xl p-6 transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-20 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Clubs Managed
          </div>
          <div className="text-4xl font-black text-primary dark:text-indigo-400">
            {numberOfClubs}
          </div>
          <div className="mt-4 text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-tighter">
            Active under your management
          </div>
        </div>

        {/* Total Members Card */}
        <div className="relative overflow-hidden bg-white dark:bg-base-200 border border-slate-200 dark:border-base-300 shadow-xl rounded-2xl p-6 transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-20 text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Total Members
          </div>
          <div className="text-4xl font-black text-secondary dark:text-cyan-400">
            {totalMembers}
          </div>
          <div className="mt-4 text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-tighter">
            Total community reach
          </div>
        </div>

        {/* Total Events Card */}
        <div className="relative overflow-hidden bg-white dark:bg-base-200 border border-slate-200 dark:border-base-300 shadow-xl rounded-2xl p-6 transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-20 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Total Events
          </div>
          <div className="text-4xl font-black text-accent dark:text-emerald-400">
            {totalEvents}
          </div>
          <div className="mt-4 text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-tighter">
            Events Organized
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className="relative overflow-hidden bg-white dark:bg-base-200 border border-slate-200 dark:border-base-300 shadow-xl rounded-2xl p-6 transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-20 text-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Total Earnings
          </div>
          <div className="text-3xl font-black text-success dark:text-green-400">
            ৳ {Number(totalPaymentsReceived || 0).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="mt-5 text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-tighter">
            Total payments received
          </div>
        </div>

      </div>

      <div className="mt-12 opacity-30">
        <hr className="border-t-2 border-dashed border-slate-300 dark:border-slate-700 max-w-7xl mx-auto" />
      </div>
    </div>
  );
};

export default ManagerOverview;