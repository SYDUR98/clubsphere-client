import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import EventFilterBar from "../../../components/Shared/EventFilterBar";
import { FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaEye } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import LoadingPage from "../../../components/Shared/LoadingPage";

const MyMemberEvents = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [clubFilter, setClubFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [paidStatus, setPaidStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);
  const [debouncedClub] = useDebounce(clubFilter, 500);
  const [debouncedLocation] = useDebounce(locationFilter, 500);

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
      const res = await axiosSecure.get(
        `/member/register/events?email=${user.email}`
      );

      let filtered = res.data;

      //  Search & Filters
      if (debouncedSearch) {
        filtered = filtered.filter((ev) =>
          ev.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      }

      if (debouncedClub) {
        filtered = filtered.filter((ev) =>
          ev.clubName.toLowerCase().includes(debouncedClub.toLowerCase())
        );
      }

      if (debouncedLocation) {
        filtered = filtered.filter((ev) =>
          ev.location.toLowerCase().includes(debouncedLocation.toLowerCase())
        );
      }

      if (dateFrom) {
        filtered = filtered.filter(
          (ev) => new Date(ev.eventDate) >= new Date(dateFrom)
        );
      }

      if (dateTo) {
        filtered = filtered.filter(
          (ev) => new Date(ev.eventDate) <= new Date(dateTo)
        );
      }

      if (paidStatus === "paid") {
        filtered = filtered.filter((ev) => ev.isPaid);
      }

      if (paidStatus === "free") {
        filtered = filtered.filter((ev) => !ev.isPaid);
      }

      // Sorting
      if (sortBy === "newest") {
        filtered.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
      }

      if (sortBy === "oldest") {
        filtered.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
      }

      if (sortBy === "highestFee") {
        filtered.sort((a, b) => (b.eventFee || 0) - (a.eventFee || 0));
      }

      if (sortBy === "lowestFee") {
        filtered.sort((a, b) => (a.eventFee || 0) - (b.eventFee || 0));
      }

      return filtered;
    },
    keepPreviousData: true,
  });

  const handleDetails = (event) => {
    navigate(`/my-event/${event._id}`, {
      state: event,
    });
  };

  return (
    <div className="p-6 bg-base-100">
      <div>
        <h2
          className="
      text-4xl md:text-2xl font-extrabold mb-8 text-center
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
          MY EVENTS
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
      <h2
        className="text-3xl font-extrabold mb-6 text-center
    bg-gradient-to-r from-primary via-secondary to-accent
    bg-clip-text text-transparent"
      ></h2>

      {/* Filters */}
      <EventFilterBar
        search={search}
        setSearch={setSearch}
        club={clubFilter}
        setClub={setClubFilter}
        location={locationFilter}
        setLocation={setLocationFilter}
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
      {isLoading && (
         <LoadingPage></LoadingPage>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {events.map((ev, index) => (
          <motion.div
            key={ev._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.03 }}
            className="bg-base-100 rounded-2xl shadow-md border border-base-200
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
                  <FaCalendarAlt className="text-primary" />
                  {new Date(ev.eventDate).toLocaleDateString()}
                </span>

                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-secondary" />
                  {ev.location}
                </span>
              </div>

              {/* Fee & Status */}
              <div className="flex justify-between items-center mt-2">
                {ev.isPaid ? (
                  <span className="badge badge-error flex items-center gap-1">
                    <FaMoneyBillWave />${ev.eventFee}
                  </span>
                ) : (
                  <span className="badge badge-success">Free</span>
                )}

                <span className="badge badge-outline badge-success flex items-center gap-1">
                  <FaCheckCircle />
                  Registered
                </span>
              </div>

              {/* Action */}
              <button
                onClick={() => handleDetails(ev)}
                className="
    btn btn-sm w-full mt-4 flex items-center justify-center gap-2 text-white font-semibold
    bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500
    hover:brightness-110 transition-all
  "
              >
                <FaEye className="text-yellow-200" /> View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty */}
      {events.length === 0 && !isLoading && (
        <p className="text-center text-neutral mt-10">No events found.</p>
      )}
    </div>
  );
};

export default MyMemberEvents;
