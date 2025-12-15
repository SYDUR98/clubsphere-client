import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import EventFilterBar from "../../../components/Shared/EventFilterBar";
import LoadingPage from "../../../components/Shared/LoadingPage";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";

const MyMemberEvents = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();


  // Filter States

  const [search, setSearch] = useState("");
  const [club, setClub] = useState("");
  const [location, setLocation] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [paidStatus, setPaidStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Debounce
  const [debouncedSearch] = useDebounce(search, 500);
  const [debouncedClub] = useDebounce(club, 500);
  const [debouncedLocation] = useDebounce(location, 500);

 
  const { data: events = [], isLoading } = useQuery({
    queryKey: [
      "member-events",
      debouncedSearch,
      debouncedClub,
      debouncedLocation,
      dateFrom,
      dateTo,
      paidStatus,
      sortBy,
    ],
    enabled: !!user?.email,
    queryFn: async () => {
      const params = new URLSearchParams();

      if (debouncedSearch) params.append("search", debouncedSearch);
      if (debouncedClub) params.append("club", debouncedClub);
      if (debouncedLocation) params.append("location", debouncedLocation);
      if (dateFrom) params.append("dateFrom", dateFrom);
      if (dateTo) params.append("dateTo", dateTo);
      if (paidStatus) params.append("paidStatus", paidStatus);
      if (sortBy) params.append("sortBy", sortBy);

      const res = await axiosSecure.get(
        `/member/register/events?email=${user.email}&${params.toString()}`
      );

      return res.data;
    },
    keepPreviousData: true,
  });

  
  const handleDetails = (event) => {
    navigate(`/my-event/${event._id}`, { state: event });
  };

  
  return (
    <div className="p-6 bg-base-100">
      {/* Title */}
      <h2
        className="text-4xl md:text-2xl font-extrabold mb-8 text-center
        bg-clip-text text-transparent tracking-wide"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #8b5cf6, #ec4899, #facc15, #3b82f6)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 15s ease-in-out infinite",
        }}
      >
        MY EVENTS
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

      {/* Filter Bar */}
      <EventFilterBar
        search={search}
        setSearch={setSearch}
        club={club}
        setClub={setClub}
        location={location}
        setLocation={setLocation}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        paidStatus={paidStatus}
        setPaidStatus={setPaidStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Loading */}
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {events.map((ev, index) => (
            <motion.div
              key={ev._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ scale: 1.03 }}
              className="bg-base-100 rounded-2xl shadow-md border
                         hover:shadow-xl transition-all"
            >
              <div className="p-5 space-y-2">
                {/* Title */}
                <h3 className="text-lg font-bold text-primary line-clamp-1">
                  {ev.title}
                </h3>

                {/* Club */}
                <p className="text-sm text-secondary font-semibold">
                  {ev.clubName}
                </p>

                {/* Date & Location */}
                <div className="flex justify-between text-sm text-neutral">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt />
                    {new Date(ev.eventDate).toLocaleDateString()}
                  </span>

                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt />
                    {ev.location}
                  </span>
                </div>

                {/* Fee & Status */}
                <div className="flex justify-between items-center mt-2">
                  {ev.isPaid ? (
                    <span className="badge badge-error flex items-center gap-1">
                      <FaMoneyBillWave /> ${ev.eventFee}
                    </span>
                  ) : (
                    <span className="badge badge-success">Free</span>
                  )}

                  <span className="badge badge-outline badge-success flex items-center gap-1">
                    <FaCheckCircle /> Registered
                  </span>
                </div>

                {/* Action */}
                <button
                  onClick={() => handleDetails(ev)}
                  className="
                    btn btn-sm w-full mt-4 text-white font-semibold
                    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                    hover:brightness-110 transition-all
                  "
                >
                  <FaEye /> View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && events.length === 0 && (
        <p className="text-center text-neutral mt-10">
          No events found.
        </p>
      )}
    </div>
  );
};

export default MyMemberEvents;
